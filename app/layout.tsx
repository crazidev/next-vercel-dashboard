import "./globals.css";
import AppProvider from "./provider";
import { cookies } from "next/headers";
import { appleDeviceSpecsForLaunchImages } from "@/lib/pwa-asset-generator";
import { PWARelatedLinks } from "./PWARelatedLinks";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var theme = cookies().get("theme")?.value;

  return (
    <html className={`${theme ?? "dark"} bg-[var(--color-background)]`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="manifest" href="/api/manifest" />
        <PWARelatedLinks />
      </head>
      <body>
        {/* <CookiesProvider> */}
        <AppProvider>{children}</AppProvider>{/* </CookiesProvider> */}
      </body>
    </html>
  );
}
