"use server";

import { verifyJwtToken } from "@/lib/jwt";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "";

export async function authUser(re_direct?: boolean) {
  var token = (await cookies()).get("token")?.value;
  try {
    if (token !== undefined && token !== "") {
      var user = (await verifyJwtToken(token!, JWT_SECRET)) as any;
      return {
        isAuth: true,
        user_id: user.userId ?? -1,
      };
    } else {
      throw {
        isAuth: false,
      };
    }
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}
