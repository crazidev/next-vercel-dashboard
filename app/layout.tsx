import "./globals.css";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
import { PWARelatedLinks } from "./PWARelatedLinks";
import type { Metadata, Viewport } from "next";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { useAppDispatch } from "@/lib/store/store";
import { isServer } from "@/lib/isServer";

const APP_NAME = process.env.APP_NAME;
const APP_DEFAULT_TITLE = process.env.APP_NAME ?? "";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ??
  `${APP_NAME} - all-in-one financial platform that seamlessly integrates fiat, crypto, and stock management. Experience fast transactions, multi-asset conversions, and top-tier security—banking redefined for the modern age.`;
const APP_THEME = process.env.NEXT_PUBLIC_APP_THEME ?? "green";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var _cookies = await cookies();
  const theme = _cookies.get("theme")?.value;

  return (
    <html suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>
          {process.env.NEXT_PUBLIC_APP_TITLE ??
            process.env.NEXT_PUBLIC_APP_NAME}
        </title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <link rel="manifest" href="/api/manifest" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_APP_LOGO ?? "favicon.png"}
          sizes="any"
        />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_APP_TITLE} />
        <meta
          property="og:description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <meta property="og:image" content={"/frame-1-nologo.png"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content={process.env.NEXT_PUBLIC_APP_URL}
        />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_APP_URL}
        />
        <meta
          name="twitter:title"
          content={process.env.NEXT_PUBLIC_APP_TITLE}
        />
        <meta
          name="twitter:description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <meta name="twitter:image" content={"/frame-1-nologo.png"} />

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='/tawk.to/script/embed.js';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        ></script>
      </head>

      <body>
        <Theme
          appearance={"inherit"}
          grayColor={"auto"}
          accentColor={APP_THEME as any}
          panelBackground="translucent"
        >
          <Toaster
            theme={theme as any}
            expand={false}
            richColors
            position={"top-left"}
            className="z-50 pointer-events-auto"
            toastOptions={{
              style: {},
            }}
          />
          <ReduxProvider>{children}</ReduxProvider>
          <Analytics />
        </Theme>
      </body>
    </html>
  );
}
