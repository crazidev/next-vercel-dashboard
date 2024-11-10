import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { UserContainer } from "app/auth/components/UserContainer";
import { Logo } from "app/auth/components/shapes/logo";
import { MdOutlineWallet, MdSettings } from "react-icons/md";
import { TbDashboard, TbCreditCard, TbChartLine } from "react-icons/tb";
import { MobileSideBarButton } from "./MobileSideBarButton";

export const navlist = [
  {
    link: "/dashboard",
    name: "Dashboard",
    icon: <TbDashboard />,
    isDefault: true,
  },
  {
    link: "/dashboard/wallets",
    name: "Wallets",
    icon: <MdOutlineWallet />,
    isDefault: true,
  },
  {
    link: "/dashboard/cards",
    name: "Cards",
    icon: <TbCreditCard />,
    isDefault: true,
  },
  {
    link: "/dashboard/transactions",
    name: "Transactions",
    icon: <TbChartLine />,
    isDefault: true,
  },
  {
    link: "/dashboard/settings",
    name: "Settings",
    icon: <MdSettings className="hover:animate-spin" />,
    isDefault: true,
  },
];

export function NavBar({ title, description }: any) {
  return (
    <div>
      <div className="flex justify-between py-2 rounded-2xl w-[100%]">
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
          <UserContainer />
        </div>
      </div>
    </div>
  );
}
