import "./globals.css";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
import { PWARelatedLinks } from "./PWARelatedLinks";
import type { Metadata, Viewport } from "next";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";

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
  // Retrieve theme from cookies
  var _cookies = await cookies();
  const theme = _cookies.get("theme")?.value;

  return (
    <html suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="manifest" href="/api/manifest" />
        <PWARelatedLinks />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let theme = "${theme}";
                if (theme !== "undefined"){
                  document.cookie = 'theme=' + theme + '; path=/; max-age=31536000;'; // 1 year expiration
                } else {
                   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    theme = "dark";
                  } else {
                    theme = "light";
                  }
                }
                document.documentElement.classList.add(theme);                  
              })();
            `,
          }}
        ></script>
      </head>
      <body>
        <Theme
          appearance={'inherit'}
          grayColor={"auto"}
          accentColor={"green"}
          panelBackground="translucent"
        >
          <Toaster
            theme={theme as any}
            expand={false}
            richColors
            position={"top-left"}
            toastOptions={{
              style: {},
            }}
          />
          <AppProvider>{children}</AppProvider>
        </Theme>
      </body>
    </html>
  );
}
