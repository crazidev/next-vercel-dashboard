"use server";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import getSequelizeInstance from "@/database/db";

import { yupValidator } from "@/server/extra/yup";
import { loginActionScheme } from "@/server/scheme/login_scheme";
import { Users } from "@/database/models/users";
import { fetchUser, revalidateUserTag } from "@/fetch/fetch_user";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
import { InferAttributes } from "sequelize";
import { Passkey } from "@/database/models/passkey";
import { server } from "@passwordless-id/webauthn";
import { userAgent } from "next/server";
import { AuthenticationResponseJSON } from "@passwordless-id/webauthn/dist/esm/types";

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
        email: validatedFields.data!.email,
      },
    }).catch((error) => {
      console.error(error);
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

/// This function will generate jwt token and also revalidateUserTag
export async function generateJWToken(user: InferAttributes<Users> | Users) {
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  cookies().set("token", token, {
    maxAge: 60 * 60 * 24 * 7,
  });
  cookies().set("user_id", user.id.toString(), {
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidateUserTag();
  await fetchUser(user.id);
  return token;
}

export async function generateRandomChallenge() {
  return server.randomChallenge();
}

export async function savePasskey(data: any): Promise<boolean | string> {
  var user = await Users.findByPk(data.user_id);
  try {
    // Access the headers from the request
    const headersList = headers();

    // Get the User-Agent header
    // const userAgent = headersList.get('user-agent');
    const _userAgent = userAgent({
      headers: headersList,
    });

    var formatted = JSON.parse(JSON.stringify(_userAgent));

    await Passkey.create({
      userId: user!.dataValues.id,
      credential: data,
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
      credential: {
        id: authentication.id,
      },
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
