"use server";

import { cookies } from "next/headers";
import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";

export async function changePasswordAction(data: any) {
  await getSequelizeInstance();
  var user_id = await cookies().get("user_id")?.value;
  var user = await Users.findByPk(user_id);

  if (!user) {
    return {
      success: false,
      errors: {
        root: "Something went wrong validating user credentials."
      },
      message: "",
    };
  }

  if(user.password != data.current_password) {
    return {
      success: false,
      errors: {
        current_password: "Current password is incorrect.",
      },
      message: "Current password is incorrect.",
    };
  }

  try {
    user.password = data.password;
    await user.save();
  } catch (error) {
    return {
      success: false,
      errors: {
        root: "Something went wrong."
      },
      message: "",
    };
  }

  return {
    success: true,
    errors: {},
    message: "Password changed successful.",
  };
}
