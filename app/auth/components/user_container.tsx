import {
  Avatar,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { Suspense } from "react";
import getSequelizeInstance from "server/database/db";
import { User } from "server/database/models/user";
import { Users } from "server/database/models/users";
import { getUser } from "server/fetch/select_user";

export async function UserContainer() {
  var user_id = cookies().get("user_id")?.value;
  var user: User | null = null;
  if (user_id != undefined) {
    var fetchUser = await getUser(user_id);
    user = fetchUser;
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Card>
            <Flex>
              <Flex gap="4" align={"center"}>
                <Avatar fallback="A" radius={"full"} />
                <div className=" hidden md:block">
                  <Text size={"2"} color={"gray"}>
                    Welcome back
                  </Text>

                  <Flex gap="2">
                    <Text>{user && user?.firstName}</Text>
                    <Text>{user && user?.lastName}</Text>
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </Card>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
