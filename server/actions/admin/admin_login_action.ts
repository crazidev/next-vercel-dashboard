"use server";

import getSequelizeInstance from "@/database/db";
import { Passkey } from "@/database/models/passkey";
import { Users } from "@/database/models/users";
import { generateJWToken } from "@/server/extra/jwt_helper";
import { yupValidator } from "@/server/extra/yup";
import { loginActionScheme } from "@/server/scheme/login_scheme";

export async function admin_login_action(formData: any) {
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
    if (user.isAdmin !== true) {
      return {
        errors: {
          root: "You do not have access to this feature",
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
