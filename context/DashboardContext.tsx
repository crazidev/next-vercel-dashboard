"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { InferAttributes } from "sequelize";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { authUser } from "@/actions/authUser";
import { fetchUser } from "@/fetch/fetch_user";

export const DashboardContext = createContext<DashboardContextProp>({
  unreadMsg: 0,
});

interface DashboardContextProp {
  unreadMsg: number,
  expandSidebar?: boolean;
  user?: InferAttributes<Users>,
  wallets?: InferAttributes<WalletBalances>[],
  setTheme?: (theme: "dark" | "light") => void;
  livechatOpen?: boolean,
  toggleLivechat?: (expand: boolean) => void,
  setExpand?: (expand: boolean) => void;
  updateUnreadMsg?: (value: number) => void;
  fetchUser?: () => Promise<InferAttributes<Users>>,
  fetchUserWallets?: () => Promise<any>,
}

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  var isDarkFromCookie = false;
  if (typeof window !== 'undefined') {
  } else {
    isDarkFromCookie = Cookies.get('theme') == 'dark';
  }

  const [state, setState] = useState<DashboardContextProp>({
    unreadMsg: 0,
    expandSidebar: false,
    livechatOpen: false,
  });


  const toggleLivechat = (value: boolean) => {
    setState({ ...state, livechatOpen: value });
  };

  const updateUnreadMsg = (value: number) => {
    setState({ ...state, unreadMsg: value });
  };


  return (
    <DashboardContext.Provider
      value={{
        ...state,
        toggleLivechat: (value) => toggleLivechat(value),
        updateUnreadMsg: (value) => updateUnreadMsg(value),
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
