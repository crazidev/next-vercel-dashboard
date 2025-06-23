"use server";
import getSequelizeInstance from "@/database/db";
import { yupValidator } from "@/server/extra/yup";
import * as yup from "yup";
import { InvestmentPlans } from "@/database/models/investment_plans";
import { Wallets } from "@/database/models/wallets";
import { UserInvestmentSettings } from "@/database/models/user_investment_settings";
import { WalletBalances } from "@/database/models/wallet_balances";

const getPlanDetailsSchema = yup.object({
  planId: yup.number().required("Plan ID is required").positive(),
  userId: yup.number().required("User ID is required").positive(),
});

export async function getInvestmentPlanDetails(formData: any) {
  try {
    await getSequelizeInstance();

    const validatedFields = yupValidator(getPlanDetailsSchema, formData);
    if (!validatedFields.isSuccess) {
      return {
        errors: validatedFields.errors,
      };
    }

    const { planId, userId } = validatedFields.data!;

    // Get plan with wallet info
    const plan = await InvestmentPlans.findOne({
      where: {
        id: planId,
        isActive: true,
      },
      include: [
        {
          model: Wallets,
          as: "wallet",
          attributes: [
            "id",
            "name",
            "shortName",
            "icon",
            "type",
            "walletAddress",
            "network",
          ],
        },
      ],
    });

    if (!plan) {
      return {
        errors: {
          planId: "Investment plan not found or inactive",
        },
      };
    }

    // Get user-specific settings
    const userSetting = await UserInvestmentSettings.findOne({
      where: {
        userId,
        planId,
      },
    });

    // Get global user settings
    const globalSettings = await UserInvestmentSettings.findOne({
      where: {
        userId,
        planId: null,
      },
    });

    // Get user's wallet balance for this plan's wallet
    const userWallet = await WalletBalances.findOne({
      where: {
        userId,
        walletId: plan.walletId,
      },
    });

    // Apply user-specific overrides
    const canInvest =
      userSetting?.canInvest ?? globalSettings?.canInvest ?? true;
    const customReturnRate =
      userSetting?.customReturnRate ?? globalSettings?.customReturnRate;
    const maxInvestmentAmount =
      userSetting?.maxInvestmentAmount ?? globalSettings?.maxInvestmentAmount;
    const signalRangeMin = userSetting?.signalRangeMin ?? plan.signalRangeMin;
    const signalRangeMax = userSetting?.signalRangeMax ?? plan.signalRangeMax;

    const planDetails = {
      id: plan.id,
      name: plan.name,
      type: plan.type,
      description: plan.description,
      minAmount: plan.minAmount,
      maxAmount: maxInvestmentAmount
        ? Math.min(plan.maxAmount, maxInvestmentAmount)
        : plan.maxAmount,
      duration: plan.duration,
      durationFormatted: {
        hours: plan.duration,
        days: Math.floor(plan.duration / 24),
        displayText:
          plan.duration < 24
            ? `${plan.duration} hours`
            : `${Math.floor(plan.duration / 24)} days`,
      },
      returnRate: customReturnRate ?? plan.returnRate,
      signalRangeMin,
      signalRangeMax,
      wallet: {
        id: plan.wallet.id,
        name: plan.wallet.name,
        shortName: plan.wallet.shortName,
        icon: plan.wallet.icon,
        type: plan.wallet.type,
        walletAddress: plan.wallet.walletAddress,
        network: plan.wallet.network,
      },
      userContext: {
        canInvest,
        availableBalance: userWallet?.balance || 0,
        hasCustomSettings: !!userSetting,
        isRestricted: !canInvest || !!maxInvestmentAmount,
        maxAllowedInvestment: Math.min(
          maxInvestmentAmount || plan.maxAmount,
          userWallet?.balance || 0,
          plan.maxAmount
        ),
      },
    };

    return {
      success: true,
      data: planDetails,
    };
  } catch (error) {
    console.error(error);
    return {
      errors: {
        root: "Internal server error",
      },
    };
  }
}
