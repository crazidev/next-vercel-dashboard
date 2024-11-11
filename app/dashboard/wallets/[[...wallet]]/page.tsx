import { Box, Card, DropdownMenu, Flex, Link, Text } from "@radix-ui/themes";
import { NavBar } from "../../components/NavBar";
import { MyCard } from "@/components/MyCard";
import { TbCoinBitcoin, TbHandClick, TbSwitch } from "react-icons/tb";
import { authUser } from "server/actions/authUser";
import { getUserWallets } from "server/fetch/fetch_wallets";
import { getUser } from "server/fetch/select_user";
import Image from "next/image";
import { MdExpand, MdExpandMore } from "react-icons/md";
import { Logo } from "app/auth/components/shapes/logo";
import { TransactionList } from "../../components/TransactionList";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { RotateSpinnerComponent } from "../../components/RotateSpinner";
import { TbSwitchVertical } from "react-icons/tb";
import { WalletBalance } from "../components/WalletBalance";

const WalletPage = async ({
  params,
}: {
  params: Promise<{ wallet: string }>
}) => {
  var user_id = authUser().user_id;
  var user = await getUser(user_id ?? -1);
  var walletList = await getUserWallets(user_id ?? -1);

  const { wallet = undefined } = await params;
  return (
    <div className="flex w-[100%] flex-grow flex-row gap-5">
      <div className="flex w-[100%] flex-[9] flex-grow flex-col">
        <NavBar
          title="Wallets"
          description="Monitor your specific wallet activities."
        />
        <Box height={"20px"} />
        <div className="flex flex-col gap-10 md:flex-row lg:gap-5">

          <Suspense fallback={<RotateSpinnerComponent />}>
            <WalletBalance
              user={user}
              wallet={wallet}
              wallet_list={walletList}
            />
          </Suspense>
          
          <Card className="flex flex-col md:w-[70%]" variant="ghost">
            <Flex justify={"between"} direction={"column"} className="gap-1">
              <Text className="font-extrabold" size={"3"}>
                Transaction History
              </Text>
            </Flex>

            <Suspense fallback={<RotateSpinnerComponent />}>
              <TransactionList wallet={wallet}/>
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
