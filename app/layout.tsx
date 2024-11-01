import { Theme, ThemePanel } from "@radix-ui/themes";
import "./globals.css";
import { Toaster } from "sonner";
import AppProvider from "./provider";
import { cookies, headers } from "next/headers";
import { CookiesProvider } from "next-client-cookies/server";
import { getCookies } from "next-client-cookies/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var theme = cookies().get("theme")?.value;
  return (
    <html className={`${theme ?? 'dark'}`}>
      <body>
      {/* <CookiesProvider> */}
        <AppProvider>{children}</AppProvider>;
      {/* </CookiesProvider> */}
      </body>
    </html>
  );
}
