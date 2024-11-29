"use client";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import DashboardProvider, { DashboardContext } from "./dashboard/providers";
import OneSignal from 'react-onesignal';
import { InitOneSignal } from "@/lib/InitOneSignal";
import { LiveChat } from "./dashboard/components/livechat/LiveChat";
import Cookies from "js-cookie";
import useThemeContext, { ThemeContext } from "@/components/hooks/useThemeContext";


// import { jellyTriangle } from 'ldrs';
// import { Inter_Tight } from "next/font/google";

// const inter_tight = Inter_Tight({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter-tight",
// });

export const metadata = {
  title: "Next.js App Router + NextAuth + Tailwind CSS",
  description: "",
};

export default function AppProvider({
  theme,
  children,
}: {
  children: React.ReactNode;
  theme?: any;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      InitOneSignal();
    }
  }, []);

  return (
    <ThemeContext.Consumer>
      {({ dark }) => <>
        <Theme
          appearance={dark ? "dark" : "light"}
          grayColor={"auto"}
          accentColor={'gold'}
          panelBackground="translucent"
        >
          <Toaster
            theme={dark ? "dark" : "light"}
            expand={false}
            richColors
            position={"top-left"}
            toastOptions={{
              style: {},
            }} />
          {/* <ThemePanel /> */}
          {children}
          <LiveChat />
        </Theme>
      </>}
    </ThemeContext.Consumer>
  );
}