"use server";
import { Users } from "@/database/models/init-models";
import getSequelizeInstance from "@/database/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RegistrationMail } from "@/server/emails/RegistrationMail";
import { yupValidator } from "@/server/extra/yup";
import { RegisterScheme } from "@/server/scheme/register_scheme";
import { sendMail } from "@/server/extra/nodemailer";
import { generateJWToken } from "@/server/extra/jwt_helper";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function register_action(formData: any) {
  try {
    await getSequelizeInstance();
    var validatedFields = yupValidator(RegisterScheme, formData);

    if (!validatedFields.isSuccess) {
      return {
        errors: validatedFields.errors,
      };
    }

    var user = await Users.findOne({
      where: {
        email: validatedFields.data!.email,
      },
    });

    if (user != null) {
      return {
        errors: {
          root: "User with this email already exists",
        },
      };
    }

    var result = await Users.create({
      firstName: validatedFields.data!.first_name,
      lastName: validatedFields.data!.last_name,
      email: validatedFields.data!.email,
      dateOfBirth: validatedFields.data!.dob.toDateString(),
      gender: validatedFields.data?.gender,
      password: validatedFields.data!.password,
      phone: validatedFields.data!.phone,
      accountLevel: 'tier1'
    });

    if (result != null) {
      var newUser = result.toJSON();

      const token = await generateJWToken(newUser);

      try {
        sendMail({
          to: newUser.email,
          subject: "Registration Successful",
          template: RegistrationMail(newUser),
        });
      } catch (error) {}

      return {
        success: true,
        message: "Registration Successful",
        errors: {},
        user: newUser,
        token: token,
      };
    } else {
      return {
        errors: {
          root: "Registration failed. Please try again later.",
        },
      };
    }
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        root: error.msg ?? "Something went wrong",
      },
    };
  }
}
