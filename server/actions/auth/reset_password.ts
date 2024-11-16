"use server";

import { ReactElement } from "react";
import { Users } from "@/database/models/users";
import { VerificationTokens } from "@/database/models/verification_tokens";
import { ResetPasswordMail } from "@/server/emails/ResetPasswordMail";
import { sendMail } from "@/server/extra/nodemailer";
import bcrypt from "bcrypt";
import getSequelizeInstance from "@/database/db";
import { generateJWToken, login } from "./login";

export async function reset_password_action(data: any) {
  console.log(data);
  await getSequelizeInstance();
  var errors = {};

  var user = await Users.findOne({
    where: {
      email: data.email ?? data.email2,
    },
  });

  try {
    if (data.action == "reset") {
      if (user == null) {
        throw { email: "User with this email does not exist" };
      }

      var randomSixDigits = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      var resetToken = await bcrypt.hash(randomSixDigits, 10);

      await VerificationTokens.destroy({
        where: {
          userId: user.id,
        },
      });
      await VerificationTokens.create({
        token: randomSixDigits,
        userId: user.id,
      });

      var link = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?action=new_password&email=${data.email}&token=${resetToken}`;
      console.log(link);

      await sendMail({
        to: data.email,
        subject: "Reset Password",
        template: ResetPasswordMail({ link: link }),
      });

      return {
        success: true,
        message: "Password reset link sent.",
        action: data.action,
      };
    } else {
      if (data.password !== data.confirm_password) {
        throw { confirm_password: "Password mismatch" };
      }

      var dbToken = await VerificationTokens.findOne({
        where: {
          userId: user?.id,
        },
      });

      if (dbToken == null) {
        throw {
          root: "Password reset link is invalid or expired. Kind reset password again.",
        };
      }

      var tokenMatch = bcrypt.compare(dbToken?.token!, data.token);

      if (!tokenMatch) {
        throw {
          root: "Password reset link is invalid or expired. Kind reset password again.",
        };
      }

      user?.update({
        password: data.password,
      });

      await user?.save();
      const token = await generateJWToken(user!);

      return {
        success: true,
        message: "Password reset successfully. Logging in...",
        user: user?.toJSON(),
        token: token,
        action: data.action,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      action: data.action,
      errors: (error as any).message ?? error,
    };
  }
}
