"use client";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import DashboardProvider, { DashboardContext } from "./dashboard/providers";
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
  children,
}: {
  children: React.ReactNode;
}) {
  // var { dark } = useContext(DashboardContext);
  return (
    <html
      lang="en"
      // FclassName={`${inter_tight}`}
    >
      <body>
        <DashboardProvider>
          <DashboardContext.Consumer>
            {(context) => (
              <Theme
                appearance={context.dark ? "dark" : "light"}
                grayColor={'auto'}
                accentColor={"green"}
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
      </body>
    </html>
  );
}
