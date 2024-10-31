import { Theme, ThemePanel } from "@radix-ui/themes";
import "./globals.css";
import { Toaster } from "sonner";
import AppProvider from "./provider";
import DashboardProvider from "./dashboard/providers";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppProvider>{children}</AppProvider>;
}
