"use server";
import { cookies } from "next/headers";
import { getCookies } from 'next-client-cookies/server';

export async function deleteCookie(data: string) {
  await cookies().delete(data);
}
export async function setCookie(name: string, value: string) {
//   await cookies().set(name, value);
(await getCookies()).set(name, value);
}

export async function getCookie(name: string) {
  return cookies().get(name);
}
