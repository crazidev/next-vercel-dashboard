import "./globals.css";
import AppProvider from "./provider";
import { cookies } from "next/headers";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var theme = cookies().get("theme")?.value;

  return (
    <html className={`${theme ?? "dark"}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body>
        {/* <CookiesProvider> */}
        <AppProvider>{children}</AppProvider>{/* </CookiesProvider> */}
      </body>
    </html>
  );
}
