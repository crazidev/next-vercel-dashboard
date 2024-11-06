import {
  Box,
  Button,
  Card,
  Flex,
  Link,
  Text,
} from "@radix-ui/themes";
import { NavBar } from "./components/NavBar";
import {
  TbHandClick,
  TbSend2,
} from "react-icons/tb";
import { MdAdd, MdCurrencyExchange } from "react-icons/md";
import { MyBarChart } from "./components/MyBarChart";
import { ChevronRight } from "lucide-react";
import { BalanceList } from "./components/BalanceList";
import { TransactionList } from "app/dashboard/components/TransactionList";
import { Suspense } from "react";
import { RotateSpinnerComponent } from "./components/RotateSpinner";


export default async function HomePage({}: {}) {
  return (
    <div className="flex w-[100%] flex-grow flex-row gap-5">
      <div className="flex w-[100%] flex-[9] flex-grow flex-col">
        <NavBar title="Overall portfolio" description="Your payments Updates" />

        <Box height={"20px"} />
        <BalanceList />
        <Flex gap={`3`} direction={"column"} className="my-10">
          <Text className="text-start font-extrabold" size={"3"}>
            Quick Actions:
          </Text>
          <Flex gap={"2"} className="flex-wrap">
            <Button size={{ md: "3" }} radius="large" variant="outline">
              <MdAdd /> Add Funds
            </Button>
            <Button size={{ md: "3" }} radius="large" variant="outline">
              <TbSend2 /> Send Money
            </Button>
            <Button size={{ md: "3" }} radius="large" variant="outline">
              <MdCurrencyExchange /> Convert Funds
            </Button>
          </Flex>
        </Flex>
        <Flex className="flex flex-col gap-5 md:flex-row">
          <Flex direction={"column"} gap={"5"}>
            <Card variant="ghost" className="">
              <Text className="text-end font-extrabold" size={"3"}>
                Weekly Stats
              </Text>
              <div className="mt-[10px] min-w-full">
                <MyBarChart />
              </div>
            </Card>
          </Flex>
          <Card className="flex flex-col md:w-[70%]" variant="ghost">
            <Flex justify={"between"} direction={"column"} className="gap-1">
              <Text className="font-extrabold" size={"3"}>
                Transaction History
              </Text>
              <Flex gap={"2"} className="mt-5 text-primary-400">
                <TbHandClick />
                <Text size={"1"}>Scroll right for more</Text>
              </Flex>
            </Flex>

            <Suspense
              fallback={
                <RotateSpinnerComponent />
              }
            >
              <TransactionList />
            </Suspense>

            <Flex justify={"end"} align={"center"} className="my-3">
              <Link>
                <Flex>
                  View all Transactions <ChevronRight />
                </Flex>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </div>
    </div>
  );
}
