"use client";

import { MyCard } from "@/components/MyCard";
import { cFmt } from "@/lib/currency-formatter";
import {
  DataList,
  DropdownMenu,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Logo } from "app/auth/shapes/logo";
import { MyBarChart } from "app/dashboard/components/MyBarChart";
import { Clipboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbClipboard, TbEyeCancel, TbSwitchVertical } from "react-icons/tb";
import { Users } from "server/database/models/users";
import { WalletBalances } from "server/database/models/wallet_balances";
import { MiniChart } from "react-ts-tradingview-widgets";

export function WalletBalance({
  wallet_list,
  wallet_id,
  user,
}: {
  wallet_list?: WalletBalances[];
  wallet_id?: any;
  user: Users | null;
}) {
  var router = useRouter();
  var selectedWallet = wallet_list?.filter((e) => e.id == wallet_id)?.at(0);

  return (
    <div className="relative md:w-[40%]">
      <MyCard>
        <div className="relative flex items-center justify-between">
          <Flex gap={"4"}>
            {selectedWallet === undefined ? (
              <Logo className={"h-[30px] w-[30px] fill-primary-700"} />
            ) : (
              <Image
                className="my-auto rounded-full"
                src={selectedWallet?.wallet?.icon ?? ""}
                width={30}
                height={30}
                alt={"logo"}
              />
            )}
            {selectedWallet?.wallet?.name ?? "Main Account"}
          </Flex>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div className="flex justify-center gap-1 text-[12px] text-gray-500">
                <div>Switch</div> <TbSwitchVertical size={16} />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size={"2"} align="start">
              <DropdownMenu.CheckboxItem
                checked={wallet_id === undefined}
                shortcut=""
                onCheckedChange={(value) => {
                  router.replace(`?`);
                }}
                className="flex items-center gap-3"
              >
                <Logo className={"h-[20px] w-[20px] fill-primary-700"} /> Main
                Account
              </DropdownMenu.CheckboxItem>

              {wallet_list &&
                wallet_list.map((wallet) => (
                  <DropdownMenu.CheckboxItem
                    key={wallet.id}
                    checked={wallet_id == wallet.id}
                    shortcut=""
                    onCheckedChange={(value) => {
                      router.replace(`?wallet_id=${wallet.id}`);
                    }}
                    className="flex items-center gap-3"
                  >
                    <Image
                      className="my-auto rounded-full"
                      src={wallet.wallet?.icon ?? ""}
                      width={20}
                      height={20}
                      alt={"logo"}
                    />
                    <Text>{wallet.wallet?.name}</Text>
                  </DropdownMenu.CheckboxItem>
                ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <div className="h-[40px]" />
        <Flex gap="4" justify={"between"}>
          <div>
            <Text trim={"end"} as={"div"} className="font-mono text-[20px]">
              {cFmt({
                amount: selectedWallet?.balance ?? user?.accountBalance,
              })}
            </Text>
            <Text size={"1"} color={"gray"} className="">
              Wallet balance
            </Text>
          </div>

          <Flex gap="4" justify={"between"} align={"center"}>
            <div>
              <Text as={"div"} className="">
                {cFmt({
                  amount: 0,
                })}
              </Text>
              <Text size={"1"} color={"gray"} as={"div"} className="">
                Income
              </Text>
            </div>
            <Separator orientation="vertical" />
            <div>
              <Text as={"div"} className="font-mono">
                {cFmt({
                  amount: 0,
                })}
              </Text>
              <Text size={"1"} color={"gray"} as={"div"} className="">
                Expenses
              </Text>
            </div>
          </Flex>
        </Flex>
        <div className="h-[50px]" />

        {wallet_id === undefined && (
          <DataList.Root orientation="horizontal" size="1">
            <DataList.Item>
              <DataList.Label color="gray">Account Holder</DataList.Label>
              <DataList.Value>{`${user?.firstName} ${user?.lastName}`}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="gray">Bank Name</DataList.Label>
              <DataList.Value>Wells Fargo</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="gray">Account Number</DataList.Label>
              <DataList.Value>4063028441123120 </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="gray">Routing</DataList.Label>
              <DataList.Value>
                121000921
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        )}

        {selectedWallet !== undefined &&
          selectedWallet.wallet?.type === "crypto" && (
            <DataList.Root orientation="horizontal" size="1">
              <DataList.Item>
                <DataList.Label color="gray">Wallet Name</DataList.Label>
                <DataList.Value className="capitalize">
                  {selectedWallet.wallet?.name} (
                  {selectedWallet.wallet?.shortName})
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label color="gray">Network</DataList.Label>
                <DataList.Value>
                  {selectedWallet.wallet?.network}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label color="gray">Wallet Address</DataList.Label>
                <DataList.Value>
                  {selectedWallet.wallet?.walletAddress}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          )}

        <div className="h-[30px]" />
        {selectedWallet && (
          <div className="">
            <MiniChart
              symbol={selectedWallet?.wallet?.shortName}
              colorTheme="dark"
              isTransparent
              height={80}
              width="100%"
              chartOnly
            ></MiniChart>
          </div>
        )}

        {/* <div className="mx-auto w-full">
          <MyBarChart />
        </div> */}
        <Text />
      </MyCard>
    </div>
  );
}
