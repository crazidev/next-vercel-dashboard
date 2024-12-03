"use client";

import { Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import OneSignal from "react-onesignal";
import { InitOneSignal } from "@/lib/InitOneSignal";
import { LiveChat } from "../components/livechat/LiveChat";
import { ThemeProvider } from "@/components/hooks/useThemeContext";
import DashboardProvider from "context/DashboardContext";

export const metadata = {
  title: "Next.js App Router + NextAuth + Tailwind CSS",
  description: "",
};

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initialize OneSignal
    if (typeof window !== "undefined") {
      InitOneSignal();

      // Get the theme from the HTML element's class
      const htmlTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setTheme(htmlTheme as "light" | "dark");
    }
  }, []);

  return (
    <ThemeProvider>
      <DashboardProvider>
        {children}
        <LiveChat />
      </DashboardProvider>
    </ThemeProvider>
  );
}
