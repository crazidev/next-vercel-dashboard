import { MyCard } from "@/components/MyCard";
import { Badge, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { Logo } from "app/auth/components/shapes/logo";
import { TbEye, TbChartArcs } from "react-icons/tb";
import { MyLineChart } from "./MyLineChart";
import { getUserWallets } from "server/fetch/fetch_wallets";
import { getUser } from "server/fetch/select_user";
import { cookies } from "next/headers";
import { authUser } from "server/actions/authUser";
import Image from "next/image";
import { cFmt } from "@/lib/currency-formatter";
import React from "react";
import Link from "next/link";

export const BalanceList = async () => {
  var user_id = authUser().user_id;
  var user = await getUser(user_id ?? -1);
  var walletList = await getUserWallets(user_id ?? -1);

  return (
    <>
      <MainBalanceCard
        user={user}
        className="relative mb-3 flex flex-[6] md:hidden"
      />
      <ScrollArea>
        <Flex className="flex flex-col gap-3 sm:flex-row" gap={"2"}>
          <MainBalanceCard
            user={user}
            className="relative hidden flex-[6] md:flex md:max-w-[350px]"
          />
          <div className="flex flex-grow flex-row gap-3">
            {walletList.map((wallet, index) => (
             <Link    key={wallet.id} href={`/dashboard/wallets?wallet_id=${wallet.wallet?.id}`}>
              <MyCard
             
                radius="10px"
                className="relative flex w-[150px] flex-1 flex-col justify-between transition-all duration-100 ease-in"
              >
                <Flex>
                  <Image
                    className="mb-3 rounded-full"
                    src={wallet.wallet?.icon ?? ""}
                    width={30}
                    height={30}
                    alt={"logo"}
                  />
                </Flex>
                <Flex gap={"2"} justify={"between"} align={"center"}>
                  <Flex direction={"column"} className="">
                    <Text className="font-mono text-[20px]">
                      {cFmt({ amount: wallet.balance })}
                    </Text>
                    <Text color="gray" className="text-[12px] font-thin">
                      {wallet.wallet?.name}
                    </Text>
                  </Flex>
                  {/* <Image
                  className="rounded-full sm:hidden"
                  src={wallet.wallet?.icon}
                  width={25}
                  height={25}
                  alt={"logo"}
                /> */}
                </Flex>
              </MyCard>
             </Link>
            ))}
          </div>
        </Flex>
      </ScrollArea>
    </>
  );
};

const MainBalanceCard = React.forwardRef<HTMLElement, any>(
  ({ user, ...props }, ref) => {
    return (
      <MyCard radius="10px" {...props}>
        <Flex className="flex h-full flex-row items-end justify-start">
          <MyLineChart />
          <Flex className="flex h-full flex-col justify-between">
            <Flex justify={"start"} align={"center"} gap={"2"}>
              <Text className="text-[12px]">Main Account</Text>{" "}
              <Flex justify={"end"} gap={"3"}>
                <Badge
                  className="text-[10px] capitalize"
                  color="green"
                  radius="large"
                >
                  {user?.status}
                </Badge>
                <Badge className="text-[10px]" color="blue" radius="large">
                  Personal Account
                </Badge>
                {/* <Badge
              className="text-[10px] capitalize"
              color="red"
              radius="large"
            >
              {user?.accountLevel}
            </Badge> */}
              </Flex>
            </Flex>
            <Flex direction={"column"} className="mb-[20px] mt-[20px] gap-2">
              <Flex className="z-[5] items-center gap-2">
                {/* <TbEye color="gray" className="text-primary-400" /> */}
                <Text
                  size={"6"}
                  weight={"bold"}
                  className="text-[var(--accent-a9)]/10 font-mono"
                >
                  {cFmt({ amount: user?.accountBalance })}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </MyCard>
    );
  }
);
