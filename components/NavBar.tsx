import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { UserContainer } from "@/components/UserContainer";
import { Logo } from "@/components/shapes/logo";
import { MdOutlineWallet, MdSettings } from "react-icons/md";
import { TbDashboard, TbCreditCard, TbChartLine } from "react-icons/tb";
import { MobileSideBarButton } from "./MobileSideBarButton";
import { Suspense } from "react";


export function NavBar({ title, description, className }: any) {
  return (
    <div className="flex justify-between mb-[10px] mobile:my-0 py-2 rounded-2xl w-[100%]">
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
          {/* <MobileSideBarButton /> */}
        </Flex>
        <Suspense>
          <UserContainer />
        </Suspense>
      </div>
    </div>
  );
}
