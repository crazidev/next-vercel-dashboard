"use server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "server/database/db";
import { users } from "server/database/drizzle/schema";
import { yupValidator } from "@/lib/yup";
import { zodValidator } from "@/lib/zod";
import { RegisterScheme } from "server/scheme/register_scheme";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "1h";

export async function register_action(formData: any) {
  var validatedFields = yupValidator(RegisterScheme, formData);

  if (!validatedFields.isSuccess) {
    return {
      errors: validatedFields.errors,
    };
  }
  var user = await db.query.users.findFirst({
    where: eq(users.email, validatedFields.data!.email),
  });

  if (user != null) {
    return {
      errors: {
        root: "User with this email already exists",
      },
    };
  }

  var result = await db
    .insert(users)
    .values({
      name: validatedFields.data!.fullname,
      email: validatedFields.data!.email,
      emailVerified: false,
      password: validatedFields.data!.password,
      phone: validatedFields.data!.phone,
      address: null,
    })
    .returning();

  if (result.length > 0) {
    var newUser = result.at(0);

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
      token: token
    };
    
  } else {
    return {
      errors: {
        root: "Something went wrong",
      },
    };
  }
}
