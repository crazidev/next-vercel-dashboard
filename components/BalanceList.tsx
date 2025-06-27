import { Flex, ScrollArea } from "@radix-ui/themes";
import { fetchUserWallets } from "@/fetch/fetch_wallets";
import { fetchUser } from "@/fetch/fetch_user";
import { authUser } from "@/actions/authUser";
import React from "react";

import { MainBalanceCard } from "./MainBalanceCard";
import { MiniWalletCard } from "./CryptoWalletCard";
import { WalletBalances } from "@/database/models/wallet_balances";

export const BalanceList = async () => {
  var user_id = (await authUser()).user_id;
  var user = await fetchUser(user_id ?? -1);
  var walletList = await fetchUserWallets(user_id ?? -1);

  // Calculate total balance across all wallets (including USD account balance)
  const totalBalance = walletList.reduce((total, walletBalance) => {
    return total + (walletBalance.balance || 0);
  }, user?.accountBalance || 0);

  // Create combined user data with total balance for MainBalanceCard
  const userWithTotalBalance = {
    ...user,
    accountBalance: totalBalance,
  };

  // Create USD main account wallet object to match the structure
  const usdMainWallet = {
    id: 0,
    userId: user_id,
    walletId: 0,
    balance: user?.accountBalance || 0,
    createdAt: null,
    updatedAt: null,
    wallet: {
      id: 0,
      name: "US Dollar",
      shortName: "USD",
      walletAddress: null,
      network: "",
      createdAt: null,
      updatedAt: null,
      type: "fiat",
      icon: "https://s3-symbol-logo.tradingview.com/indices/u-s-dollar-index--big.svg", // You can add a USD icon URL here if needed
    },
    isMainAccount: true,
  };

  // Combine USD wallet with other wallets
  const allWallets = [usdMainWallet, ...walletList];

  return (
    <>
      <MainBalanceCard
        user={userWithTotalBalance}
        className="relative flex flex-[6] md:hidden mb-3 !p-0"
      />
      <ScrollArea className="no-scrollbar">
        <Flex className="flex sm:flex-row flex-col gap-3" gap={"2"}>
          <MainBalanceCard
            user={userWithTotalBalance}
            className="relative h-[140px]  md:min-w-[300px]  md:flex flex-[6] hidden md:max-w-[350px]"
          />
          <div className="flex flex-row flex-grow gap-3">
            {allWallets.map((walletBalance, index) => (
              <MiniWalletCard
                key={walletBalance.id}
                wallet={walletBalance as WalletBalances}
                isMainAccount={walletBalance.walletId == 0}
                index={index}
              />
            ))}
          </div>
        </Flex>
      </ScrollArea>
    </>
  );
};
