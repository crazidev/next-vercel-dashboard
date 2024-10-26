import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { UserContainer } from "app/auth/components/user_container";
import { MobileSideBarButton } from "./mobile_nav_button";

export function NavBar({ title, description }: any) {
  return (
    <div className="top-2 py-2 rounded-2xl backdrop-blur-xl sticky flex w-[100%] justify-between">
      <Flex gap={"4"} align={"center"}>
        <MobileSideBarButton />
      </Flex>
      <UserContainer />
    </div>
  );
}
