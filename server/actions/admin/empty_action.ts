"use server";

import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";
import { yupValidator } from "@/server/extra/yup";
import { loginActionScheme } from "@/server/scheme/login_scheme";

export async function empty_action(formData: any) {
  // try {
  //   await getSequelizeInstance();
  //   var validatedFields = yupValidator(loginActionScheme, formData);
  //   if (!validatedFields.isSuccess) {
  //     return {
  //       errors: validatedFields.errors,
  //     };
  //   }

  //   try {
  //     return {
  //       success: true,
  //       message: "Login Successful",
        
  //     };
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     errors: {
  //       root: "Internal server error",
  //     },
  //   };
  // }
}
