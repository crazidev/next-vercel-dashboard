"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  cookies().delete("token");
  cookies().delete("user_id");
  cookies().delete("is_admin");

  redirect("/auth/login");
}
