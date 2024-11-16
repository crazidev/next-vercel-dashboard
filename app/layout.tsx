import "./globals.css";
import AppProvider from "./provider";
import { cookies } from "next/headers";
import { PWARelatedLinks } from "./PWARelatedLinks";
import type { Metadata, Viewport } from "next";

const APP_NAME = process.env.APP_NAME;
const APP_DEFAULT_TITLE = process.env.APP_NAME ?? "";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var theme = (await cookies()).get("theme")?.value;

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
