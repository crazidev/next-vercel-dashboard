import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function logout() {
    cookies().delete('token');
    cookies().delete('user_id');

    redirect("/login");
}