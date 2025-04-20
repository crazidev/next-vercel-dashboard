"use server";
import { headers } from "next/headers";
import getSequelizeInstance from "@/database/db";

import { yupValidator } from "@/server/extra/yup";
import { loginActionScheme } from "@/server/scheme/login_scheme";
import { Users } from "@/database/models/users";

import { InferAttributes } from "sequelize";
import { Passkey } from "@/database/models/passkey";
import { server } from "@passwordless-id/webauthn";
import { userAgent } from "next/server";
import { AuthenticationResponseJSON } from "@passwordless-id/webauthn/dist/esm/types";
import { generateJWToken } from "@/server/extra/jwt_helper";
import { verifyJwtToken } from "@/lib/jwt";
import { generateWallet } from "./generateWallet";

export async function login(formData: any) {
  try {
    await getSequelizeInstance();
    var validatedFields = yupValidator(loginActionScheme, formData);
    if (!validatedFields.isSuccess) {
      return {
        errors: validatedFields.errors,
      };
    }

    var user = await Users.findOne({
      where: {
        email: validatedFields.data!.email.trim(),
      },
    });

    if (user == null) {
      return {
        errors: {
          email: "User with this email does not exists",
        },
      };
    }

    if (user?.password != validatedFields.data!.password) {
      return {
        errors: {
          password: ["Wrong password"],
        },
      };
    } else {
      // Generate JWT
      const token = await generateJWToken(user);
      await generateWallet({ userId: user.id });

      var userPasskey = await Passkey.findOne({
        where: {
          userId: user.id,
        },
      });

      return {
        success: true,
        token: token,
        message: "Login Successful",
        user: user.toJSON(),
        hasPasskey: userPasskey !== null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      errors: {
        root: "Internal server error",
      },
    };
  }
}

export async function generateRandomChallenge() {
  return server.randomChallenge();
}

export async function savePasskey(data: any): Promise<boolean | string> {
  console.log("Save passkey");
  var user = await Users.findByPk(data.user_id);
  try {
    // Access the headers from the request
    const headersList = headers();

    // Get the User-Agent header
    // const userAgent = headersList.get('user-agent');
    const _userAgent = userAgent({
      headers: headersList,
    });

    var formatted = JSON.stringify(_userAgent);

    console.log("Create new passkey in table");

    await Passkey.create({
      userId: user!.dataValues.id,
      credential: JSON.stringify(data),
      passkeyId: data.id,
      device: formatted,
    });

    return true;
  } catch (error) {
    console.error("Couldn't create passkey", error);
    return false;
  }
}

export async function checkPasskey({
  authentication,
  challenge,
}: {
  authentication: AuthenticationResponseJSON;
  challenge: string;
}) {
  var credential = await Passkey.findOne({
    where: {
      passkeyId: authentication.id,
    },
  });

  if (credential != null) {
    var data = JSON.parse(credential.dataValues.credential);

    try {
      const authenticationParsed = await server.verifyAuthentication(
        authentication,
        {
          ...data,
          algorithm: "ES256",
        },
        {
          challenge: challenge,
          origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
          userVerified: true,
        }
      );

      const decodedString = atob(authenticationParsed.userId!);
      var user_id = decodedString.split("_")[1];

      var user = await Users.findByPk(user_id);

      if (user == null) {
        throw {};
      }

      var token = await generateJWToken(user);

      return {
        success: true,
        token: token,
        message: "Login Successful",
        user: user.toJSON(),
        hasPasskey: true,
        errors: {},
      };
    } catch (error) {
      throw {
        success: false,
        errors: {
          root: "Internal server error",
        },
      };
    }
  } else {
    return {
      success: false,
      errors: {
        root: "Passkey expired or related user not found.",
      },
    };
  }
}

export async function checkGoogleAuthLogin(email: string) {
  try {
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    // const user = result.user;

    await getSequelizeInstance();

    var user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user == null) {
      return {
        errors: {
          email: "User with this email does not exists",
        },
      };
    }

    const token = await generateJWToken(user);

    return {
      success: true,
      token: token,
      user: user.toJSON(),
      message: "Login successful",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
