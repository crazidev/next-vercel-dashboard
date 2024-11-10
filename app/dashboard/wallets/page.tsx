import { Box, Card, DropdownMenu, Flex, Link, Text } from "@radix-ui/themes";
import { NavBar } from "../components/NavBar";
import { MyCard } from "@/components/MyCard";
import { TbCoinBitcoin, TbHandClick, TbSwitch } from "react-icons/tb";
import { authUser } from "server/actions/authUser";
import { getUserWallets } from "server/fetch/fetch_wallets";
import { getUser } from "server/fetch/select_user";
import Image from "next/image";
import { MdExpand, MdExpandMore } from "react-icons/md";
import { Logo } from "app/auth/components/shapes/logo";
import { TransactionList } from "../components/TransactionList";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { RotateSpinnerComponent } from "../components/RotateSpinner";
import { TbSwitchVertical } from "react-icons/tb";
import { WalletBalance } from "./components/WalletBalance";

const WalletPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  var user_id = authUser().user_id;
  var user = await getUser(user_id ?? -1);
  var walletList = await getUserWallets(user_id ?? -1);

  const { wallet_id = undefined } = await searchParams;
  return (
    <div className="flex flex-row flex-grow gap-5 w-[100%]">
      <div className="flex flex-col flex-grow flex-[9] w-[100%]">
        <NavBar
          title="Wallets"
          description="Monitor your specific wallet activities."
        />
        <Box height={"20px"} />
        <div className="flex md:flex-row flex-col gap-10 lg:gap-5">
          <WalletBalance
            wallet_id={wallet_id}
            user={user}
            wallet_list={walletList.map((e) => e.toJSON())}
          />
          <Card className="flex flex-col md:w-[70%]" variant="ghost">
            <Flex justify={"between"} direction={"column"} className="gap-1">
              <Text className="font-extrabold" size={"3"}>
                Transaction History
              </Text>
            </Flex>

            <Suspense fallback={<RotateSpinnerComponent />}>
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
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
