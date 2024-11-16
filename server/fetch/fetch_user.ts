"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { InferAttributes } from "sequelize";
import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";

export const fetchUser = async (id: number | string): Promise<InferAttributes<Users> | null> => {
  var user = unstable_cache(
    async (id) => {
      await getSequelizeInstance();
      var data = await Users.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });
      // console.log(`USER:`, data?.toJSON());
      return data?.toJSON();
    },
    [],
    {
      tags: ["user"],
    }
  );

  return await user(id);
};

export async function revalidateUserTag() {
  revalidateTag("user");
}
