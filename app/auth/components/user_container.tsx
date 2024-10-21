import { Avatar, Button, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { cookies } from "next/headers";
import { Suspense } from "react";
import getSequelizeInstance from "server/database/db";
import { Users } from "server/database/models/users";

export async function UserContainer() {
  var user_id = cookies().get("user_id")?.value;
  await getSequelizeInstance();
  var fetchUser = await Users.findByPk(user_id);

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
                      <Text>{fetchUser && fetchUser.firstName}</Text>
                      <Text>{fetchUser && fetchUser.lastName}</Text>
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
