"use server";

import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";
import { yupValidator } from "@/server/extra/yup";
import { loginActionScheme } from "@/server/scheme/login_scheme";
import { revalidatePath } from "next/cache";

export async function change_password_action({ user_id, password }) {
  try {
    var t = await (await getSequelizeInstance()).transaction();

    await Users.update(
      {
        password: password,
      },
      {
        where: {
          id: user_id,
        },
        transaction: t,
      }
    );

    await t.commit();
    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Password changed Successfully",
    };
  } catch (error) {
    await t.rollback();
    console.error(error);
    return {
      error: "Internal server error",
    };
  }
}
