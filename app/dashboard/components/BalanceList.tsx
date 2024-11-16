import { MyCard } from "@/components/MyCard";
import { Badge, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { MyLineChart } from "./MyLineChart";
import { fetchUserWallets } from "@/fetch/fetch_wallets";
import { fetchUser } from "@/fetch/fetch_user";
import { authUser } from "@/actions/authUser";
import { cFmt } from "@/lib/cFmt";
import React from "react";
import Link from "next/link";

export const BalanceList = async () => {
  var user_id = authUser().user_id;
  var user = await fetchUser(user_id ?? -1);
  var walletList = await fetchUserWallets(user_id ?? -1);

  return (
    <>
      <MainBalanceCard
        user={user}
        className="relative flex flex-[6] md:hidden mb-3"
      />
      <ScrollArea>
        <Flex className="flex sm:flex-row flex-col gap-3" gap={"2"}>
          <MainBalanceCard
            user={user}
            className="relative min-h-[100px] md:flex flex-[6] hidden md:max-w-[350px]"
          />
          <div className="flex flex-row flex-grow gap-3">
            
            {walletList.map((wallet, index) => (
              <Link key={wallet.id} href={`/dashboard/wallets?wallet_id=${wallet.wallet?.id}`}>
                <MyCard

                  radius="10px"
                  className="relative min-h-[100px] flex flex-col flex-1 justify-between dark:hover:border-[var(--accent-7)] p-[10px] w-[150px] min-w-[130px] transition-all duration-100 ease-in"
                >
                  <Flex>
                    <img
                      className="mb-3 rounded-full w-[30px]"
                      src={wallet.wallet?.icon ?? ""}

                      alt={""}
                    />
                  </Flex>
                  <Flex gap={"2"} justify={"between"} align={"center"}>
                    <Flex direction={"column"} className="">
                      <Text className="font-mono text-[20px]">
                        {cFmt({ amount: wallet.balance })}
                      </Text>
                      <Text trim={'start'} color="gray" className="font-thin text-[12px]">
                        {wallet.wallet?.name}
                      </Text>
                    </Flex>
                    {/* <Image
                  className="sm:hidden rounded-full"
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
        <Flex className="flex flex-row justify-start items-end h-full">
          <MyLineChart />
          <Flex className="flex flex-col justify-between h-full">
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
                 {user?.accountLevel == "tier1" && "Savings Account"}
                 {user?.accountLevel == "tier2" && "Business Account"}
                 {user?.accountLevel == "tier3" && "Enterprise Account"}
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
            <Flex direction={"column"} className="gap-2 mt-[20px] mb-[20px]">
              <Flex className="z-[5] items-center gap-2">
                {/* <TbEye color="gray" className="text-primary-400" /> */}
                <Text
                  size={"6"}
                  weight={"bold"}
                  className="font-mono text-[var(--accent-a9)]/10"
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
