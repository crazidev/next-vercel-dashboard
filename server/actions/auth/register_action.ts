"use server";
import { yupValidator } from "@/lib/yup";
import { RegisterScheme } from "server/scheme/register_scheme";
import { Users } from "server/database/models/init-models";
import getSequelizeInstance from "server/database/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || '';
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
    });


    
    if (result != null) {
      var newUser = result.toJSON();

      const token = jwt.sign(
        { userId: newUser?.id, email: newUser?.email },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );

      cookies().set("token", token);
      cookies().set("user_id", newUser!.id.toString());

      return {
        success: true,
        message: "Login Successful",
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
