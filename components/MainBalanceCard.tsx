import { MyCard } from "@/components/MyCard";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { MyLineChart } from "./MyLineChart";
import { cFmt } from "@/lib/cFmt";
import React from "react";

export const MainBalanceCard = React.forwardRef<HTMLElement, any>(
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
