"use client";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import DashboardProvider, { DashboardContext } from "./dashboard/providers";
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
  // var { dark } = useContext(DashboardContext);
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {(context) => (
          <Theme
            // appearance={context.dark ? "dark" : "light"}
            grayColor={"auto"}
            accentColor={'plum'}
            panelBackground="translucent"
          >
            <Toaster
              theme={context.dark ? "dark" : "light"}
              expand={false}
              richColors
              position={"top-left"}
              toastOptions={{
                style: {},
              }}
            />{" "}
            {/* <ThemePanel /> */}
            {children}
          </Theme>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
