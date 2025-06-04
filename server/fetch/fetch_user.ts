"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { InferAttributes } from "sequelize";
import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";

export const fetchUser = async (
  id: number | string,
  props?: { force: boolean }
): Promise<InferAttributes<Users> | null> => {
  const cacheDependency = props?.force ? Date.now().toString() : id.toString();
  if (props?.force) {
    revalidateUserTag();
  }

  // var user = unstable_cache(
  // async (id: number | string) => {
  await getSequelizeInstance();
  const data = await Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
  return data?.toJSON() || null;

  // },
  //   [cacheDependency],
  //   {
  //     tags: ["user"], // Tags used for cache invalidation
  //   }
  // );

  // return await user(id);
};

export async function revalidateUserTag() {
  revalidateTag("user");
}
