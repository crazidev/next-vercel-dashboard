"use server";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "server/database/db";
import { users } from "server/database/drizzle/schema";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "1h";
import yup, { yupValidator } from "@/lib/yup";
import { zodValidator } from "@/lib/zod";
import { loginActionScheme } from "server/scheme/login_scheme";

export async function login(formData: any) {
  var validatedFields = yupValidator(loginActionScheme, formData);

  if (!validatedFields.isSuccess) {
    return {
      errors: validatedFields.errors,
    };
  }

  var user = await db.query.users.findFirst({
    where: eq(users.email, validatedFields.data!.email),
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
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    cookies().set("token", token);
    cookies().set("user_id", user.id.toString());

    return {
      success: true,
      token: token,
      message: "Login Successful",
    };
  }
}
