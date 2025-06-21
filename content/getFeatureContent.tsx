import AnimatedBeamMultipleOutputDemo from "@/components/animated_beam/animted_beam_multi_output";
import { TerminalComponent } from "@/components/landing/terminal";
import { ReactNode } from "react";

interface FeatureContent {
  title: string;
  description: string;
  image_type: "image" | "icon" | "element";
  image?: string | ReactNode;
}

interface FeatureContentType {
  appName: string;
  isDefault: boolean;
  features: FeatureContent[];
}

export function getFeatureContent({
  isDark,
  wallets,
}: {
  isDark: boolean;
  wallets: any;
}): FeatureContentType[] {
  return [
    {
      appName: "default",
      isDefault: true,
      features: [
        {
          title: "Crypto Banking Made Simple",
          description:
            "Deposit, transfer, and swap between crypto and fiat effortlessly. Take control of your digital assets with a platform built for the future.",
          image_type: "element",
          image: (
            <AnimatedBeamMultipleOutputDemo
              className="w-full"
              wallets={wallets}
            />
          ),
        },
        {
          title: "Multi-Wallet\nFlexibility",
          description:
            "Manage multiple wallets in one place—crypto, fiat, and stocks—all secured and accessible anytime, anywhere.",
          image_type: "image",
          image: isDark ? "multi-wallet.png" : "multi-wallet-light.png",
        },
        {
          title: "Fast Fiat\nTransactions",
          description:
            "Enjoy hassle-free wire transfers and ACH payments for your traditional banking needs, paired with next-gen efficiency.",
          image_type: "image",
          image: isDark ? "fast-transfer.png" : "fast-transfer-light.png",
        },
        {
          title: "Multi-Asset\nConversions",
          description:
            "Convert fiat to crypto, crypto to stocks, or stocks to fiat in seconds—unmatched flexibility for your financial needs.",
          image_type: "element",
          image: (
            <img
              src={isDark ? "convert.png" : "convert-light.png"}
              className="object-contain"
              alt={"Fast Fiat Transactions"}
            />
          ),
        },
        {
          title: "Unbreakable Security",
          description:
            "Rest easy with AES-256 encryption, cold storage for crypto, and real-time monitoring—your assets are safe and sound.",
          image_type: "element",
          image: (
            <div className="flex justify-center items-center">
              <TerminalComponent />
            </div>
          ),
        },
      ],
    },
  ];
}
