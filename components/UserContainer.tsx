import {
  Avatar,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { DarkModeToggler } from "@/components/DarkModeToggler";
import { cookies } from "next/headers";
import { MdSupportAgent } from "react-icons/md";
import { Users } from "@/database/models/users";
import { fetchUser } from "@/fetch/fetch_user";
import { LivechatToggler } from "@/components/LivechatToggler";
import { InferAttributes } from "sequelize";
import { ChevronDownIcon } from "lucide-react";
import { logout } from "@/actions/auth/logout";

export async function UserContainer() {
  var user_id = (await cookies()).get("user_id")?.value;
  var user: InferAttributes<Users> | null = null;
  if (user_id != undefined) {
    var getUser = await fetchUser(user_id);
    user = getUser;
  }

  return (
    <>
      <Flex align={'center'} gap={'3'}>
        <LivechatToggler />
        <DarkModeToggler />
        <Flex gap="2" align={"center"}>
          <div className="md:block hidden">
            <Flex gap="1" className="text-[12px]">
              <Text>{user && user?.firstName}</Text>
              <Text>{user && user?.lastName}</Text>
            </Flex>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div className="flex items-center gap-2 px-2 py-1 bg-primary-200 rounded-xl">
                <Avatar fallback={user.firstName.at(0)} size={"2"} radius={"full"} />
                <ChevronDownIcon />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={async (e) => {
                'use server';
                logout();
              }}>Logout</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Flex >
    </>
  );
}
