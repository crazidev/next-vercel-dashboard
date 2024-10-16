import { Theme, ThemePanel } from "@radix-ui/themes";
import "./globals.css";
// import { Inter_Tight } from "next/font/google";

// const inter_tight = Inter_Tight({
// 	subsets: ["latin"],
// 	display: "swap",
// 	variable: "--font-inter-tight",
// });

export const metadata = {
  title: "Next.js App Router + NextAuth + Tailwind CSS",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"
    //  className={inter_tight.variable}
     >
      <body className="">
        <Theme>
          {children}
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
