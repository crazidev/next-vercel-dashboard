"use client";

import { WalletBalances } from "@/database/models/wallet_balances";
import { cFmt } from "@/lib/cFmt";
import { useCryptoConvert } from "@context/CryptoConvertContext";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { InferAttributes } from "sequelize";
import { MyCard } from "./MyCard";
import { useAppSelector } from "@/lib/store/store";
import { ConverterText } from "./ConverterText";

export const MiniWalletCard = ({
  wallet,
  index,
  isMainAccount = false,
}: {
  wallet: WalletBalances;
  index: number;
  isMainAccount?: boolean;
}) => {
  return (
    <Link href={`/dashboard/wallets/${wallet.wallet?.shortName}`}>
      <MyCard
        radius="10px"
        className="relative h-[140px] flex flex-col flex-1 justify-between dark:hover:border-[var(--accent-7)] p-[10px] min-w-[150px] transition-all duration-100 ease-in"
      >
        <Flex>
          <img
            className="mb-3 rounded-full w-[30px]"
            src={wallet.wallet?.icon ?? ""}
            alt={""}
          />
        </Flex>
        <Flex gap={"2"} justify={"between"} align={"center"}>
          <Flex direction={"column"} className="">
            <Text className="font-mono text-[18px]">
              <ConverterText
                amount={wallet.balance}
                code={wallet.wallet.shortName}
                isCrypto={wallet.wallet.type !== "fiat"}
              />
            </Text>

            <Text trim={"start"} className="text-[10px] text-primary-700">
              {isMainAccount
                ? "Main Account"
                : `≈${cFmt({ amount: wallet.balance })}`}
            </Text>

            <Text
              trim={"start"}
              color="gray"
              className="font-normal text-[12px]"
            >
              {wallet.wallet?.name}
            </Text>
          </Flex>
        </Flex>
      </MyCard>
    </Link>
  );
};
