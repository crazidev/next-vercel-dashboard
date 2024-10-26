import {
  Avatar,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { MobileSideBarButton } from "app/dashboard/components/mobile_nav_button";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { Suspense } from "react";
import getSequelizeInstance from "server/database/db";
import { Users } from "server/database/models/users";
import { getUser } from "server/fetch/select_user";

export async function UserContainer() {
  var user_id = cookies().get("user_id")?.value;
  var user: Users | null = null;
  if (user_id != undefined) {
    var fetchUser = await getUser(user_id);
    user = fetchUser;
  }

  return (
    <>
      <Flex>
        <Flex gap="2" align={"center"}>
          <div className=" hidden md:block">
            <Flex gap="1" className=" text-[12px]">
              <Text>{user && user?.firstName}</Text>
              <Text>{user && user?.lastName}</Text>
            </Flex>
          </div>
          <Avatar fallback="A" size={"2"} radius={"full"} />
        </Flex>
      </Flex>
    </>
  );
}
