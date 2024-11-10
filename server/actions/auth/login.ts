"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import getSequelizeInstance from "server/database/db";

import yup, { yupValidator } from "server/extra/yup";
import { zodValidator } from "server/extra/zod";
import { loginActionScheme } from "server/scheme/login_scheme";
import { Users } from "server/database/models/users";
import { getUser, revalidateUserTag } from "server/fetch/select_user";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

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

      return {
        success: true,
        token: token,
        message: "Login Successful",
        user: user.toJSON(),
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
export async function generateJWToken(user: Users) {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );

  cookies().set("token", token, {
    maxAge: 60 * 60 * 24 * 7,
  });
  cookies().set("user_id", user.id.toString(), {
    maxAge: 60 * 60 * 24 * 7,
  });
  revalidateUserTag();
  await getUser(user.id);
  return token;
}

