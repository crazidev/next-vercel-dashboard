import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Link,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { NavBar } from "./components/my-navbar";
import {
  TbChartArcs,
  TbCheck,
  TbEye,
  TbHandClick,
  TbHandTwoFingers,
  TbSend2,
} from "react-icons/tb";
import { MdAdd, MdCurrencyExchange } from "react-icons/md";
import { Component } from "./components/chart";
import { MyCard } from "@/components/my_card";
import { ChevronRight, ScrollIcon } from "lucide-react";
import { Logo } from "app/auth/shapes/logo";
import { MyLineChart } from "./components/chart2";
import { BalanceList } from "./components/balance_list";

export default async function HomePage({}: {}) {
  return (
    <div className="flex flex-row flex-grow gap-5 w-[100%]">
      <div className="flex flex-col flex-[9] flex-grow w-[100%]">
        <NavBar title="Overall portfolio" description="Your payments Updates" />

        <Box height={"20px"} />
        <BalanceList />
        <Flex gap={`3`} direction={"column"} className="my-10">
          <Text className="font-extrabold text-start" size={"3"}>
            Quick Actions:
          </Text>
          <Flex gap={"2"} className="flex-wrap ">
            <Button size={{ md: "4" }} radius="large" variant="outline">
              <MdAdd /> Add Funds
            </Button>
            <Button size={{ md: "4" }} radius="large" variant="outline">
              <TbSend2 /> Send Money
            </Button>
            <Button size={{ md: "4" }} radius="large" variant="outline">
              <MdCurrencyExchange /> Convert Funds
            </Button>
          </Flex>
        </Flex>
        <Flex className="flex flex-col md:flex-row gap-5">
          <Flex direction={"column"} gap={"5"}>
            <Card variant="ghost" className="">
              <Text className="font-extrabold text-end" size={"3"}>
                Weekly Stats
              </Text>
              <div className="mt-[10px] min-w-full">
                <Component />
              </div>
            </Card>
          </Flex>
          <Card className="flex flex-grow flex-col" variant="ghost">
            <Flex justify={"between"} direction={"column"} className="gap-1">
              <Text className="font-extrabold " size={"3"}>
                Transaction History
              </Text>
              <Flex gap={"2"} className="text-primary-400 mt-5">
                <TbHandClick />
                <Text size={"1"}>Scroll right for more</Text>
              </Flex>
            </Flex>

            <ScrollArea className="">
              {" "}
              <table className="overflow-scroll w-[100%]  max-w-[100%] overflow-x-scroll table-auto border-separate border-spacing-y-[10px]">
                <tbody>
                  {[
                    {
                      amount: 50,
                      type: "credit",
                      name: "Transfer from Crazidev Dev",
                      time: "12:30PM",
                      date: "28th Oct 2024",
                    },
                    {
                      amount: "500",
                      type: "debit",
                      name: "Transfer to Demo User",
                      time: "01:30PM",
                      date: "21th Oct 2024",
                    },
                    {
                      amount: "1,000",
                      type: "credit",
                      name: "Transfer to Richie Smart",
                      time: "01:30PM",
                      date: "01th Nov 2024",
                    },
                    {
                      amount: "5,000",
                      type: "debit",
                      name: "Transfer to Hulu",
                      time: "01:30PM",
                      date: "11th Sep 2024",
                    },
                  ].map((item) => (
                    <tr
                      key={item.name}
                      className="transition-colors duration-300 p-[20px] cursor-pointer
                   rounded-[100px] bg-card-background backdrop-blur-sm hover:bg-[var(--accent-3)]
                  "
                    >
                      <td className="p-2 flex items-center gap-2">
                        <Avatar
                          size={15}
                          fallback={item.name.at(0)!.toString()}
                          radius="full"
                        />
                        <div className="flex flex-col">
                          <Text as="div" size="2" truncate={true}>
                            {item.name}
                          </Text>
                          <Text className="text-[10px] text-[var(--gray-9)]">
                            {item.date} {item.time}
                          </Text>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <Badge
                          size={"1"}
                          color={item.type == "credit" ? "green" : "red"}
                        >
                          Bank Transfer
                        </Badge>
                      </td>
                      <td className="p-2 text-right">
                        <Text
                          size={"3"}
                          color={item.type == "credit" ? "green" : "red"}
                        >
                          ${item.amount}
                        </Text>
                      </td>
                      <td className="p-2 text-right">
                        <IconButton
                          color="green"
                          variant="soft"
                          size={"2"}
                          radius="full"
                        >
                          <TbCheck />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
            <Flex justify={"end"} align={"center"} className="my-3">
              <Link>
                <Flex>
                  View All Transactions <ChevronRight />
                </Flex>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </div>
      {/* <Flex className="hidden lg:flex w-[25%] flex-row gap-3">
        <Card className="flex w-[100%]"></Card>
      </Flex> */}
    </div>
  );
}
