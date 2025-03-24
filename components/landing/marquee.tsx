import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

const reviews = [
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
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:90s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:90s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--accent-1)]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--accent-1)]"></div>
    </div>
  );
}


interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
