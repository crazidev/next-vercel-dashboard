import {
  Avatar,
  Flex,
  Text,
} from "@radix-ui/themes";
import { DarkModeToggler } from "app/dashboard/components/DarkModeToggler";
import { cookies } from "next/headers";
import { MdSupportAgent } from "react-icons/md";
import { Users } from "@/database/models/users";
import { fetchUser } from "@/fetch/fetch_user";
import { LivechatToggler } from "@app/dashboard/components/LivechatToggler";

export async function UserContainer() {
  var user_id = (await cookies()).get("user_id")?.value;
  var user: Users | null = null;
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
          <Avatar fallback="A" size={"2"} radius={"full"} />
        </Flex>
      </Flex>
    </>
  );
}
