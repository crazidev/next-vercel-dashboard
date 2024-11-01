import { MyCard } from "@/components/my_card";
import { Badge, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { Logo } from "app/auth/shapes/logo";
import { TbEye, TbChartArcs } from "react-icons/tb";
import { MyLineChart } from "./chart2";
import { getUserWallets } from "server/fetch/fetch_wallets";
import { getUser } from "server/fetch/select_user";
import { cookies } from "next/headers";
import { authUser } from "server/actions/authUser";

export async function BalanceList() {
  var user_id = authUser().user_id;
  var user = await getUser(user_id ?? -1);
  var walletList = await getUserWallets(user_id ?? -1);

  return (
    <ScrollArea>
      <Flex className="flex sm:flex-row flex-col gap-3" gap={"2"}>
        <MyCard radius="10px" className="flex-[6] relative md:max-w-[350px]">
          <Flex className="h-full flex flex-row justify-start items-end ">
            <MyLineChart />
            <Flex className="h-full flex flex-col justify-start ">
              <Flex justify={"start"} align={"center"} gap={"2"}>
                <Logo className="w-[20px] h-[20px] fill-primary-500" />
                <Text className="text-[12px]">Main Account</Text>{" "}
                <Flex justify={"start"} gap={"3"}>
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
                  <Badge
                    className="text-[10px] capitalize"
                    color="red"
                    radius="large"
                  >
                    {user?.accountLevel}
                  </Badge>
                </Flex>
              </Flex>
              <Flex direction={"column"} className="gap-2 mt-[20px] mb-[30px]">
                <Flex className="gap-2 items-center z-[5]">
                  <TbEye color="gray" className="text-primary-400" />
                  <Text
                    size={"5"}
                    weight={"bold"}
                    className="text-[var(--accent-a9)]/10"
                  >
                    ${user?.accountBalance}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </MyCard>
        <div className="flex-grow flex flex-row gap-3">
          {walletList.map((wallet, index) => (
            <MyCard
              key={wallet.id}
              radius="10px"
              className="flex-1 max-w-[150px]"
            >
              <TbChartArcs
                size={25}
                className="text-primary-600 mb-5 hidden sm:block"
              />
              <Flex justify={"between"} align={"center"}>
                <Flex direction={"column"} className="">
                  <Text className="text-[20px] font-mono">
                    ${wallet.balance}
                  </Text>
                  <Text color="gray" className="text-[12px] font-thin">
                    {wallet.wallet?.name}
                  </Text>
                </Flex>
                <TbChartArcs
                  size={25}
                  className="text-primary-600 mb-5 sm:hidden"
                />
              </Flex>
            </MyCard>
          ))}
          {/* <MyCard radius="10px" className="flex-1 md:max-w-[150px]">
          <TbChartArcs
            size={25}
            className="text-primary-600 mb-5 hidden sm:block"
          />
          <Flex justify={"between"} align={"center"}>
            <Flex direction={"column"} className="">
              <Text className="text-[20px] font-mono">$4,000</Text>
              <Text color="gray" className="text-[12px] font-thin">
                Income
              </Text>
            </Flex>
            <TbChartArcs
              size={25}
              className="text-primary-600 mb-5 sm:hidden"
            />
          </Flex>
        </MyCard>
        <MyCard radius="10px" className="flex-1 md:max-w-[150px]">
          <TbChartArcs
            size={25}
            className="text-primary-600 mb-5 hidden sm:block"
          />
          <Flex justify={"between"} align={"center"}>
            <Flex direction={"column"} className="">
              <Text className="text-[20px] font-mono">$4,000</Text>
              <Text color="gray" className="text-[12px] font-thin">
                Income
              </Text>
            </Flex>
            <TbChartArcs
              size={25}
              className="text-primary-600 mb-5 sm:hidden"
            />
          </Flex>
        </MyCard> */}
        </div>
      </Flex>
    </ScrollArea>
  );
}
