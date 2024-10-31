import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Link,
  Table,
  Text,
} from "@radix-ui/themes";
import { NavBar } from "./components/my-navbar";
import {
  TbArrowsTransferUp,
  TbChartArcs,
  TbChartArrows,
  TbCheck,
  TbClipboardCopy,
  TbCopy,
  TbCubeSend,
  TbEye,
  TbEyeCancel,
  TbEyeClosed,
  TbEyeDollar,
  TbSend2,
  TbTransferIn,
  TbTransferOut,
  TbTransferVertical,
} from "react-icons/tb";
import {
  MdAdd,
  MdCurrencyExchange,
  MdOutlineTransferWithinAStation,
} from "react-icons/md";
import { Component } from "./components/chart";
import { MyCard } from "@/components/my_card";
import { ChevronRight, EyeIcon, SendIcon } from "lucide-react";
import { Logo } from "app/auth/shapes/logo";
import { MyLineChart } from "./components/chart2";

export default async function HomePage({}: {}) {
  return (
    <div className="flex flex-row flex-grow gap-5 w-[100%]">
      <div className="flex flex-col flex-[9] flex-grow w-[100%]">
        <NavBar title="Overall portfolio" description="Your payments Updates" />

        <Box height={"20px"} />
        <Flex className="flex sm:flex-row flex-col gap-3" gap={"2"}>
          <MyCard radius="10px" className="flex-[6]">
            <Flex className="h-full flex flex-row justify-start items-end ">
              <Flex className="h-full flex flex-col justify-start ">
                <Flex justify={"start"} align={"center"} gap={"2"}>
                  <Logo className="w-[20px] h-[20px] fill-primary-500" />
                  <Text className="text-[12px]">Main Account</Text>{" "}
                </Flex>
                <Flex direction={"column"} className="gap-2 mt-[10px] mb-[20px]">
                <MyLineChart />
                  <Flex className="gap-2 items-center z-[5]">
                    <TbEye color="gray" className="text-primary-400" />
                    <Text
                      size={"5"}
                      weight={"bold"}
                      className="text-primary-700"
                    >
                      $300,000.00
                    </Text>
                  </Flex>
                
                  {/* <Flex justify={"start"} gap={"3"}>
                    <Badge className="text-[10px]" color="green" radius="large">
                      Active
                    </Badge>
                    <Badge className="text-[10px]" color="blue" radius="large">
                      Personal
                    </Badge>
                    <Badge className="text-[10px]" color="red" radius="large">
                      Tier 1
                    </Badge>
                  </Flex> */}
                </Flex>
              </Flex>

              {/* <MyLineChart /> */}
            </Flex>
          </MyCard>
          <div className="flex-grow flex flex-row gap-3">
            <MyCard radius="10px" className="flex-1">
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
            <MyCard radius="10px" className="flex-1">
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
          </div>
        </Flex>

        <Flex gap={`3`} direction={"column"} className="my-10">
          <Text className="font-extrabold text-start" size={"3"}>
            Quick Actions:
          </Text>
          <Flex gap={`3`}>
            <Button size={"4"} radius="large" variant="outline">
              <MdAdd /> Add Funds
            </Button>
            <Button size={"4"} radius="large" variant="outline">
              <TbSend2 /> Send Money
            </Button>
            <Button size={"4"} radius="large" variant="outline">
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
            <Flex justify={"between"}>
              <Text className="font-extrabold mb-5" size={"3"}>
                Transaction History
              </Text>
            </Flex>

            <table className="overflow-scroll table-auto border-separate border-spacing-y-[10px]">
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
                    className="transition-colors duration-300 p-[20px] backdrop-blur-2xl after:absolute after:content-[''] after:inset-0 after:z-[-1] dark:after:bg-[var(--accent-2)] after:opacity-90 dark:after:opacity-9 rounded-[100px] hover:bg-[var(--accent-7)] cursor-pointer"
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
                    <td className="p-2 text-right">
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
