"use client";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import DashboardProvider, { DashboardContext } from "./dashboard/providers";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // var { dark } = useContext(DashboardContext);
  return (
    <html lang="en">
      <body>
        <DashboardProvider>
          <DashboardContext.Consumer>
            {(context) => (
              <Theme
                appearance={context.dark ? "dark" : "light"}
                grayColor={"sand"}
                accentColor={"purple"}
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
                />
                {children}    
              </Theme>
              
            )}
          </DashboardContext.Consumer>
        </DashboardProvider>
      </body>
    </html>
  );
}
