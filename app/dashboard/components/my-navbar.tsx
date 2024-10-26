import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { UserContainer } from "app/auth/components/user_container";
import { MobileSideBarButton } from "./mobile_nav_button";

export function NavBar({ title, description }: any) {
  return (
    <div className="top-2 p-2 rounded-2xl backdrop-blur-xl sticky flex w-[100%] justify-between">
      <Flex gap={"4"} align={"center"}>
        <MobileSideBarButton />

        <div className="flex flex-col py-1">
          <Text size={"5"} weight={"bold"}>
            {title ?? ""}
          </Text>

          {description && (
            <Text className="font-[12px] text-pretty" color="gray">
              {description}
            </Text>
          )}
        </div>
      </Flex>

      {/* <Button
          variant="ghost"
          radius="full"
          color="gray"
          className="h-[45px] px-2"
        > */}
      <UserContainer />
      {/* </Button> */}
    </div>
  );
}
