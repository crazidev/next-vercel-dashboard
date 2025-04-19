
import { MyCard } from "@/components/MyCard";
import { Flex, ScrollArea, Text } from "@radix-ui/themes";
import { fetchUserWallets } from "@/fetch/fetch_wallets";
import { fetchUser } from "@/fetch/fetch_user";
import { authUser } from "@/actions/authUser";
import { cFmt } from "@/lib/cFmt";
import React, { Suspense } from "react";
import Link from "next/link";

import { WalletBalances } from "@/database/models/wallet_balances";
import { InferAttributes } from "sequelize";
import { MainBalanceCard } from "./MainBalanceCard";
import { CryptoWalletCard } from "./CryptoWalletCard";

export const BalanceList = async () => {
  var user_id = (await authUser()).user_id;
  var user = await fetchUser(user_id ?? -1);
  var walletList = await fetchUserWallets(user_id ?? -1);

  return (
    <>
      <MainBalanceCard
        user={user}
        className="relative flex flex-[6] md:hidden mb-3"
      />
      <ScrollArea>
        <Flex className="flex sm:flex-row flex-col gap-3" gap={"2"}>
          <MainBalanceCard
            user={user}
            className="relative h-[140px] md:flex flex-[6] hidden md:max-w-[350px]"
          />
          <div className="flex flex-row flex-grow gap-3">

            {walletList.map((wallet, index) => (
              // <Suspense fallback="Loading...">
              <CryptoWalletCard key={wallet.id} wallet={wallet} index={index} />
              // </Suspense>
            ))}
          </div>
        </Flex>
      </ScrollArea>
    </>
  );
};


