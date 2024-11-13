import { Box, DropdownMenu, Flex, Select, Spinner, Text } from "@radix-ui/themes";
import { NavBar } from "../../components/NavBar";
import { CTextField } from "@/components/CTextField";
import { Search } from "lucide-react";
import { authUser } from "server/actions/authUser";
import { getUserWallets } from "server/fetch/fetch_wallets";
import { getUser } from "server/fetch/select_user";
import { TransactionList } from "../../components/TransactionList";
import { Logo } from "app/auth/components/shapes/logo";
import { TbSwitchVertical } from "react-icons/tb";
import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import { MdExpandMore } from "react-icons/md";
import { WalletListDropDown } from "app/dashboard/wallets/components/WalletListDropDown";
import { SearchInput } from "app/dashboard/components/SearchInput";

export default async function TransactionPage({
  searchParams,
  params,
}: {
  params: Promise<{ wallet?: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;

}) {
  var user_id = authUser().user_id;
  var user = await getUser(user_id);
  var walletList = await getUserWallets(user_id);

  const { wallet } = await params;
  const { q } = await searchParams;

  var _walletBalance = walletList?.filter((e) => e.wallet?.shortName == wallet)?.at(0);

  return (
    <div className="flex flex-row flex-grow gap-5 w-[100%]">
      <div className="flex flex-col flex-grow flex-[9] w-[100%]">
        <NavBar title="Transactions" description="Your transactions history" />
        <Flex className="md:flex-row flex-col justify-between items-end gap-5 md:gap-10">
          <div className="w-full md:w-[40%]">
            <SearchInput placeholder={"Search Transaction"} onSubmit={async (e) => {
              'use server';
              redirect(e.path + (e.value ? '?q=' + e.value : ""), RedirectType.push);
            }} />
          </div>
          <Flex align={'center'} justify={'end'} gap={'4'}>

            <WalletListDropDown showAll wallet={wallet} wallet_list={walletList} trigger={
              <div className="flex justify-center gap-2 bg-[var(--background)] text-[12px] text-gray-500">
                {wallet == 'main' ? <>
                  <Logo className={"h-[20px] w-[20px] fill-primary-700"} /> Main
                  Account</> : <>
                  {wallet && <Image
                    className="my-auto rounded-full"
                    src={_walletBalance?.wallet?.icon ?? ""}
                    width={20}
                    height={20}
                    alt={"logo"} />}
                  <div>{_walletBalance?.wallet?.name ?? "All"}</div>
                </>}
                <MdExpandMore size={16} />
              </div>
            } />


            <Select.Root size={'2'} defaultValue="DESC">
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="ASC">
                  ASC
                </Select.Item>
                <Select.Item value="DESC">
                  DESC
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

        </Flex>
        <Box height={"50px"} />
        <Suspense fallback={<Spinner />}>
          <TransactionList search={q} wallet={wallet} />
        </Suspense>
      </div>
    </div>
  );


}
