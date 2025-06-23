import { useAppLayout } from "hooks/useAppLayout";
import { ReactNode } from "react";

type FeatureType = "wallet" | "banking" | "investment";

interface FeatureWrapperProps {
  features: FeatureType | FeatureType[]; // Accept single feature or array
  children: ReactNode;
  fallback?: ReactNode;
  requireAll?: boolean; // If true, ALL features must be enabled. If false, ANY feature can be enabled
}

export function FeatureWrapper({
  features,
  children,
  fallback = null,
  requireAll = false,
}: FeatureWrapperProps) {
  const { config } = useAppLayout();

  // Normalize features to array
  const featureArray = Array.isArray(features) ? features : [features];

  const checkFeature = (feature: FeatureType): boolean => {
    switch (feature) {
      case "wallet":
        return config.showWallet;
      case "banking":
        return config.showBanking;
      case "investment":
        return config.showInvestment;
      default:
        return false;
    }
  };

  const shouldShow = () => {
    if (requireAll) {
      // ALL features must be enabled
      return featureArray.every((feature) => checkFeature(feature));
    } else {
      // ANY feature can be enabled (OR logic)
      return featureArray.some((feature) => checkFeature(feature));
    }
  };

  if (!shouldShow()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
