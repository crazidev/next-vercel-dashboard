import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

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
    <html lang="en">
      <body className="">
        <Theme>
          {children}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
