import { useMemo } from "react";

export type AppLayout = "wallet" | "banking" | "investment";

export interface LayoutFeatures {
  showWallet: boolean;
  showBanking: boolean;
  showInvestment: boolean;
  showTransactions: boolean;
  showCrypto: boolean;
  showStocks: boolean;
  appName: string;
  primaryColor: string;
  features: string[];
}

export function useAppLayout() {
  const layout = (process.env.NEXT_PUBLIC_APP_LAYOUT as AppLayout) || "wallet";

  const layoutConfig = useMemo((): LayoutFeatures => {
    switch (layout) {
      case "investment":
        return {
          showWallet: false,
          showBanking: false,
          showInvestment: true,
          showTransactions: true, // Investment transactions
          showCrypto: true, // For investment wallets
          showStocks: false,
          appName: "Investment Platform",
          primaryColor: "#10B981", // Green
          features: ["forex_trading", "crypto_mining", "portfolio_tracking"],
        };

      case "banking":
        return {
          showWallet: false,
          showBanking: true,
          showInvestment: false,
          showTransactions: true,
          showCrypto: false,
          showStocks: false,
          appName: "Digital Bank",
          primaryColor: "#3B82F6",
          features: ["bank_transfers", "bill_payments", "account_management"],
        };

      case "wallet":
      default:
        return {
          showWallet: true,
          showBanking: true,
          showInvestment: true,
          showTransactions: true,
          showCrypto: true,
          showStocks: true,
          appName: "Multi Wallet",
          primaryColor: "#8B5CF6", // Purple
          features: ["all_features"],
        };
    }
  }, [layout]);

  return {
    layout,
    config: layoutConfig,
    isInvestmentApp: layout === "investment",
    isBankingApp: layout === "banking",
    isWalletApp: layout === "wallet",
  };
}
