import { Box, Card, DropdownMenu, Flex, Link, Text } from "@radix-ui/themes";
import { NavBar } from "../../../../components/NavBar";
import { MyCard } from "@/components/MyCard";
import { TbCoinBitcoin, TbHandClick, TbSwitch } from "react-icons/tb";
import { authUser } from "@/actions/authUser";
import { fetchUserWallets } from "@/fetch/fetch_wallets";
import { fetchUser } from "@/fetch/fetch_user";
import Image from "next/image";
import { MdExpand, MdExpandMore } from "react-icons/md";
import { Logo } from "@/components/shapes/logo";
import { TransactionList } from "../../../../components/TransactionList";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { RotateSpinnerComponent } from "../../../../components/RotateSpinner";
import { TbSwitchVertical } from "react-icons/tb";
import { WalletBalance } from "../components/WalletBalance";

const WalletPage = async ({
  params,
}: {
  params: Promise<{ wallet: string }>
}) => {
  var user_id = (await authUser()).user_id;
  var user = await fetchUser(user_id ?? -1);
  var walletList = await fetchUserWallets(user_id ?? -1);

  const { wallet = undefined } = await params;
  return (
    <div className="flex flex-row flex-grow w-[100%]">
      <div className="flex flex-col flex-grow w-[100%]">
        <NavBar
          title="Wallets"
          description="Monitor your specific wallet activities."
        />

        <div className="flex flex-col gap-5">

          <Suspense fallback={<RotateSpinnerComponent />}>
            <WalletBalance
              user={user}
              wallet={wallet}
              wallet_list={walletList}
            />
          </Suspense>


          <div className="m-0 w-full">
            <Flex justify={"between"} direction={"column"} className="gap-1 mb-5">
              <Text className="font-extrabold" size={"3"}>
                Transaction History
              </Text>
            </Flex>

            <Suspense fallback={<RotateSpinnerComponent />}>
              <TransactionList type="compact" wallet={wallet} />
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WalletPage;
