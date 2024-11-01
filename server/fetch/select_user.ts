"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import getSequelizeInstance from "server/database/db";
import { Users } from "server/database/models/users";

export const getUser = async (id: number | string): Promise<Users | null> => {
  var user = unstable_cache(
    async (id) => {
      await getSequelizeInstance();
      var data = await Users.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });
      console.log(`USER:`, data?.toJSON());
      return data;
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
