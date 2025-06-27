"use client";

import { MyCard } from "@/components/MyCard";
import { cFmt } from "@/lib/cFmt";
import { DataList, Flex, Separator, Text } from "@radix-ui/themes";
import { Logo } from "@/components/shapes/logo";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { MiniChart } from "react-ts-tradingview-widgets";
import { WalletListDropDown } from "./WalletListDropDown";
import { InferAttributes } from "sequelize";
import { useContext, useState, useEffect } from "react";
import { useCryptoConvert } from "@context/CryptoConvertContext";

export function WalletBalance({
  wallet_list,
  user,
  wallet,
}: {
  wallet_list?: InferAttributes<WalletBalances>[];
  user: InferAttributes<Users> | null;
  wallet: any;
}) {
  var _walletBalance = wallet_list
    ?.filter((e) => e.wallet?.shortName == wallet)
    ?.at(0);
  const convert = useCryptoConvert();
  const [amount, setAmount] = useState(wallet?.balance);
  var shortName = _walletBalance?.wallet?.shortName ?? "USD";
  var balance = _walletBalance?.balance ?? user?.accountBalance;

  useEffect(() => {
    if (convert?.convert?.isReady == true) {
      var amount = convert.convert["USD"][shortName](balance ?? 0);
      setAmount(amount);
    }
  }, [convert.convert]);

  console.log(shortName);

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
          <WalletListDropDown wallet={wallet} wallet_list={wallet_list} />
        </div>

        <div className="h-[30px]" />

        {/* Balance */}
        <Flex gap="4" justify={"between"}>
          <div>
            <Text className="font-mono text-[18px]">
              {cFmt({
                amount: amount,
                code: shortName,
                isCrypto: shortName !== "USD",
              })}
            </Text>
            <Text
              as="div"
              trim={"start"}
              className="text-[10px] text-primary-700"
            >
              ≈{cFmt({ amount: balance })}
            </Text>

            <Text size={"1"} color={"gray"} className="">
              Wallet balance
            </Text>
          </div>

          <Flex gap="4" justify={"between"} align={"center"}>
            {/* <div>
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
            </div> */}
          </Flex>
        </Flex>

        <div className="h-[30px]" />

        {/* Main Account Details TODO */}
        {(wallet == undefined || wallet == "main") && (
          <DataList.Root orientation="horizontal" size="1">
            <DataList.Item>
              <DataList.Label color="gray">Account Holder</DataList.Label>
              <DataList.Value>{`${user?.firstName} ${user?.lastName}`}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="gray">Bank Name</DataList.Label>
              <DataList.Value>
                {process.env.NEXT_PUBLIC_APP_SHORT_NAME}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="gray">Account Number</DataList.Label>
              <DataList.Value>{user.accountNumber ?? ""} </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="gray">Routing</DataList.Label>
              <DataList.Value>{user.routingNumber ?? ""}</DataList.Value>
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
            <div className="pointer-events-none cursor-none">
              <MiniChart
                symbol={_walletBalance?.wallet?.shortName}
                colorTheme="dark"
                isTransparent
                height={150}
                width="100%"
                chartOnly
              ></MiniChart>
            </div>
          </>
        )}
        <Text />
      </MyCard>
    </div>
  );
}
