import {
  Box,
  Button,
  Card,
  Flex,
  Link,
  Text,
} from "@radix-ui/themes";
import { NavBar } from "../../components/NavBar";
import {
  TbHandClick,
  TbSend2,
} from "react-icons/tb";
import { MdAdd, MdCurrencyExchange } from "react-icons/md";
import { MyBarChart } from "../../components/MyBarChart";
import { ChevronRight } from "lucide-react";
import { BalanceList } from "../../components/BalanceList";
import { TransactionList } from "@/components/TransactionList";
import { Suspense } from "react";
import { RotateSpinnerComponent } from "../../components/RotateSpinner";
import { AlertComponent } from "../../components/AlertComponent";
import { WeeklyStats } from "../../components/WeeklyStatsComponent";
import { authUser } from "@/actions/authUser";
import { fetchUser } from "@/fetch/fetch_user";
import { fetchUserWallets } from "@/fetch/fetch_wallets";
import ConvertModal from "./@modals/convert/ConvertModal";
import { AddFundsModal } from "./@modals/add-funds/AddFundsModal";
import { SendMoneyModal } from "./@modals/send-money/SendMoneyModal";


export default async function HomePage({ }: {}) {
  var user_id = (await authUser()).user_id;
  var user = await fetchUser(user_id);
  var walletList = await fetchUserWallets(user_id ?? -1);

  return (
    <div className="flex flex-row flex-grow gap-5">
      <div className="flex flex-col flex-grow flex-[9] w-[100%]">
        <NavBar title="Overall portfolio" description="Your payments Updates" />
        <AlertComponent />
        <BalanceList />

        <Flex gap={`3`} direction={"column"} className="my-10">
          <Text className="font-extrabold text-start" size={"3"}>
            Quick Actions:
          </Text>
          <Flex gap={"2"} className="flex-wrap">
            <AddFundsModal walletList={walletList} user={user} />
            <SendMoneyModal walletList={walletList} user={user} />
            <ConvertModal walletList={walletList} user={user} />
          </Flex>
        </Flex>
        <Flex className="flex lg:flex-row flex-col gap-5">
          <Flex direction={"column"} gap={"5"}>
            <div className="">
              <div className="mt-[10px] min-w-full">
                <WeeklyStats />
              </div>
            </div>
          </Flex>
          <Card className="flex flex-col md:w-[70%]" variant="ghost">
            <Flex justify={"between"} direction={"column"} className="gap-1 mb-3">
              <Text className="font-extrabold" size={"3"}>
                Transaction History
              </Text>
              {/* <Flex gap={"2"} className="my-3 text-primary-400">
                <TbHandClick />
                <Text size={"1"}>Scroll right for more</Text> */}
              {/* </Flex> */}
            </Flex>

            <Suspense
              fallback={
                <RotateSpinnerComponent />
              }
            >
              <TransactionList type="compact" />
            </Suspense>

            <Flex justify={"end"} align={"center"} className="my-3">
              <Link href="transactions">
                <Flex>
                  View More <ChevronRight />
                </Flex>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </div>
    </div>
  );
}
