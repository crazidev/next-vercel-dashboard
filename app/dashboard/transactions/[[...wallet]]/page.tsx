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

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ wallet: string }>
}) {
  var user_id = authUser().user_id;
  var user = await getUser(user_id ?? -1);
  var walletList = await getUserWallets(user_id ?? -1);
  const { wallet = undefined } = await params;
  console.log(wallet);
  var _walletBalance = walletList?.filter((e) => e.wallet?.shortName == wallet)?.at(0);

  return (
    <div className="flex w-[100%] flex-grow flex-row gap-5">
      <div className="flex w-[100%] flex-[9] flex-grow flex-col">
        <NavBar title="Transactions" description="Your transactions history" />

        <Box height={"20px"} />
        <Flex className="flex-col items-end justify-between gap-5 md:flex-row md:gap-10">
          <div className="w-full md:w-[40%]">
            <CTextField
              label=""
              placeholder="Search transaction"
              leftIcon={<Search size={15} className="mx-2" />}
              className="h-[40px] rounded-full shadow-none md:h-[45px]"
            // rightIcon={<MdRemoveRedEye />}
            // error={errors?.password?.message}
            // register={register("password")}
            />
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

            {/* <DropdownMenu.Root>
      <DropdownMenu.Trigger>
       

      </DropdownMenu.Trigger>
      <DropdownMenu.Content size={"2"} align="start">
        <DropdownMenu.CheckboxItem
          checked={wallet === undefined}
          onCheckedChange={async (value) => {
            // 'use server';
            redirect('/dashboard/transactions', RedirectType.replace);
          }}
          className="flex items-center gap-3"
        >
          All
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem
          checked={wallet == 'main'}
          onCheckedChange={async (value) => {
            // 'use server';
            redirect('/dashboard/transactions?wallet=main', RedirectType.replace);
          }}
          className="flex items-center gap-3"
        >
          <Logo className={"h-[20px] w-[20px] fill-primary-700"} /> Main
          Account
        </DropdownMenu.CheckboxItem>

        {wallet_list &&
          wallet_list.map((wallet) => (
            <DropdownMenu.CheckboxItem
              key={wallet.wallet?.shortName}
              checked={(wallet as any) == wallet.wallet?.shortName}
              shortcut=""
              onCheckedChange={async (value) => {
                // 'use server';
                // onCheckChange(wallet);
                redirect('/dashboard/transactions?wallet=' + wallet.wallet!.shortName, RedirectType.replace);
              }}
              className="flex items-center gap-3"
            >
              <Image
                className="my-auto rounded-full"
                src={wallet.wallet?.icon ?? ""}
                width={20}
                height={20}
                alt={"logo"} />
              <Text>{wallet.wallet?.name}</Text>
            </DropdownMenu.CheckboxItem>
          ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>; */}


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
          <TransactionList wallet={wallet} />
        </Suspense>
      </div>
    </div>
  );


}
