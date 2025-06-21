import AnimatedBeamMultipleOutputDemo from "@/components/animated_beam/animted_beam_multi_output";
import { TerminalComponent } from "@/components/landing/terminal";
import { ReactNode } from "react";

interface ReviewContentType {
  appName: string;
  isDefault: boolean;
  reviews: {
    name: string;
    username: string;
    body: string;
    img: string;
  }[];
}

export function getReviewContent(): ReviewContentType[] {
  return [
    {
      appName: "default",
      isDefault: true,
      reviews: [
        {
          name: "Sophie",
          username: "@sophie_finance",
          body: "The security is next-level. AES-256 and cold storage? I sleep better now.",
          img: "https://avatar.vercel.sh/sophie_finance",
        },
        {
          name: "Liam",
          username: "@liam_crypto",
          body: "Converted fiat to Bitcoin in seconds. This is game-changing!",
          img: "https://avatar.vercel.sh/liam_crypto",
        },
        {
          name: "Emma",
          username: "@emma_stocks",
          body: "Managing all my wallets here is so easy. Absolutely love it!",
          img: "https://avatar.vercel.sh/emma_stocks",
        },
        {
          name: "Noah",
          username: "@noah_bank",
          body: "Live chat saved me at 2 AM. Best support ever!",
          img: "https://avatar.vercel.sh/noah_bank",
        },
        {
          name: "Olivia",
          username: "@olivia_invest",
          body: "Stock-to-crypto conversions? Mind blown. This app is incredible!",
          img: "https://avatar.vercel.sh/olivia_invest",
        },
        {
          name: "Ethan",
          username: "@ethan_secure",
          body: "Fortress-grade security for my assets. I’m beyond impressed!",
          img: "https://avatar.vercel.sh/ethan_secure",
        },
        {
          name: "Ava",
          username: "@ava_money",
          body: "Wire transfers are lightning fast. This is banking done right!",
          img: "https://avatar.vercel.sh/ava_money",
        },
        {
          name: "Mason",
          username: "@mason_trader",
          body: "Swapped crypto to stocks seamlessly. Can’t get enough of this!",
          img: "https://avatar.vercel.sh/mason_trader",
        },
        {
          name: "Isabella",
          username: "@isabella_fiat",
          body: "Finally, a platform that gets crypto and fiat. It’s amazing!",
          img: "https://avatar.vercel.sh/isabella_fiat",
        },
        {
          name: "Lucas",
          username: "@lucas_wallet",
          body: "Multi-wallet management is a dream. This app is pure gold!",
          img: "https://avatar.vercel.sh/lucas_wallet",
        },
        {
          name: "Mia",
          username: "@mia_support",
          body: "24/7 chat support is unreal. They fixed my issue instantly!",
          img: "https://avatar.vercel.sh/mia_support",
        },
        {
          name: "Logan",
          username: "@logan_crypto",
          body: "Cold storage for crypto? I’m sold. Security is top-notch!",
          img: "https://avatar.vercel.sh/logan_crypto",
        },
        {
          name: "Charlotte",
          username: "@charlotte_finance",
          body: "Converted stocks to fiat effortlessly. This is next-level banking!",
          img: "https://avatar.vercel.sh/charlotte_finance",
        },
        {
          name: "Aiden",
          username: "@aiden_secure",
          body: "Real-time monitoring gives me peace of mind. Love this platform!",
          img: "https://avatar.vercel.sh/aiden_secure",
        },
        {
          name: "Amelia",
          username: "@amelia_trades",
          body: "Crypto and stocks in one place? I’m obsessed with this!",
          img: "https://avatar.vercel.sh/amelia_trades",
        },
        {
          name: "Elijah",
          username: "@elijah_bank",
          body: "ACH payments are so quick. This app is a lifesaver!",
          img: "https://avatar.vercel.sh/elijah_bank",
        },
        {
          name: "Harper",
          username: "@harper_invest",
          body: "The security terminal blew my mind. My assets feel invincible!",
          img: "https://avatar.vercel.sh/harper_invest",
        },
        {
          name: "Benjamin",
          username: "@benjamin_money",
          body: "Swapping fiat to crypto is effortless. This is the future!",
          img: "https://avatar.vercel.sh/benjamin_money",
        },
        {
          name: "Zoe",
          username: "@zoe_stocks",
          body: "Everything I need in one app. I’m absolutely amazed!",
          img: "https://avatar.vercel.sh/zoe_stocks",
        },
      ],
    },
  ];
}
