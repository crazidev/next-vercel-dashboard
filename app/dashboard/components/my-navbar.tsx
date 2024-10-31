import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { UserContainer } from "app/auth/components/user_container";
import { MobileSideBarButton } from "./mobile_nav_button";

export function NavBar({ title, description }: any) {
  return (
    <div className="top-2 py-2 rounded-2xl backdrop-blur-xl sticky flex w-[100%] justify-between">
      <div className="flex flex-col py-1">
        <Text size={"5"} weight={"bold"}>
          {title}
        </Text>

        <Text className="text-[12px] text-pretty" color="gray">
          {description}
        </Text>
      </div>
      <div className="flex flex-row gap-3">
        <Flex gap={"4"} align={"center"}>
          <MobileSideBarButton />
        </Flex>
        {/* <UserContainer /> */}
      </div>
    </div>
  );
}
