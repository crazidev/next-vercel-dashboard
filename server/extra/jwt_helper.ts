import { Users } from "@/database/models/users";
import { revalidateUserTag, fetchUser } from "@/fetch/fetch_user";
import { createJwtToken, verifyJwtToken } from "@/lib/jwt";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { InferAttributes } from "sequelize";

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

/// This function will generate jwt token and also revalidateUserTag
export async function generateJWToken(user: InferAttributes<Users> | Users) {
  const token = await createJwtToken(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    JWT_EXPIRES_IN
  );

  cookies().set("token", token, {
    maxAge: 60 * 60 * 24 * 7,
  });
  cookies().set("user_id", user.id.toString(), {
    maxAge: 60 * 60 * 24 * 7,
  });
  cookies().set("is_admin", user.isAdmin.toString(), {
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidateUserTag();
  await fetchUser(user.id);
  return token;
}

export function validateJWT(token: string):
  | {
      userId: number;
      email: string;
    }
  | JwtPayload {
  try {
    var data = verifyJwtToken(token, JWT_SECRET);
    return data as any;
  } catch (error) {
    var err: JsonWebTokenError = error;
    throw {
      message: err.message,
      name: err.name,
    };
  }
}
