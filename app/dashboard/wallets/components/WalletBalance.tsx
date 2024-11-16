"use client";

import { MyCard } from "@/components/MyCard";
import { cFmt } from "@/lib/cFmt";
import {
  DataList,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Logo } from "app/auth/components/shapes/logo";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { MiniChart } from "react-ts-tradingview-widgets";
import { WalletListDropDown } from "./WalletListDropDown";

export function WalletBalance({
  wallet_list,
  user,
  wallet,
}: {
  wallet_list?: WalletBalances[];
  user: Users | null;
  wallet: any
}) {

  var _walletBalance = wallet_list?.filter((e) => e.wallet?.shortName == wallet)?.at(0);

  return (
    <div className="relative top-[20px] lg:sticky mb-2 lg:w-[40%] h-fit">
      <MyCard>
        <div className="relative flex justify-between items-center">
          {/* Wallet Title & Logo */}
          <Flex gap={"4"}>
            {_walletBalance === undefined ? (
              <Logo className={"h-[30px] w-[30px] fill-primary-700"} />
            ) : (
              <Image
                className="my-auto rounded-full"
                src={_walletBalance?.wallet?.icon ?? ""}
                width={30}
                height={30}
                alt={"logo"}
              />
            )}
            {_walletBalance?.wallet?.name ?? "Main Account"}
          </Flex>
          <WalletListDropDown wallet={wallet} wallet_list={wallet_list}
          />
        </div>

        <div className="h-[30px]" />

        {/* Balance */}
        <Flex gap="4" justify={"between"}>
          <div>
            <Text trim={"end"} as={"div"} className="font-mono text-[20px]">
              {cFmt({
                amount: _walletBalance?.balance ?? user?.accountBalance,
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

        <div className="h-[30px]" />

        {/* Main Account Details */}
        {(wallet == undefined || wallet == 'main') && (
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

        {/* Wallet Details */}
        {_walletBalance !== undefined &&
          _walletBalance.wallet?.type === "crypto" && (
            <DataList.Root orientation="horizontal" size="1">
              <DataList.Item>
                <DataList.Label color="gray">Wallet Name</DataList.Label>
                <DataList.Value className="capitalize">
                  {_walletBalance.wallet?.name} (
                  {_walletBalance.wallet?.shortName})
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label color="gray">Network</DataList.Label>
                <DataList.Value>
                  {_walletBalance.wallet?.network}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label color="gray">Wallet Address</DataList.Label>
                <DataList.Value>
                  {_walletBalance.wallet?.walletAddress}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          )}

        {/* Wallet Chart */}
        {_walletBalance && (
          <>
            <div className="h-[30px]" />
            <div className="">
              <MiniChart
                symbol={_walletBalance?.wallet?.shortName}
                colorTheme="dark"
                isTransparent
                height={80}
                width="100%"
                chartOnly
              ></MiniChart>
            </div></>
        )}
        <Text />
      </MyCard>
    </div>
  );
}
