"use server";
import getSequelizeInstance from "@/database/db";
import { yupValidator } from "@/server/extra/yup";
import * as yup from "yup";
import { InvestmentPlans } from "@/database/models/investment_plans";
import { Wallets } from "@/database/models/wallets";
import { UserInvestmentSettings } from "@/database/models/user_investment_settings";

const getInvestmentPlansSchema = yup.object({
  userId: yup.number().required("User ID is required").positive(),
  type: yup.string().oneOf(["forex", "crypto_mining"]).optional(),
  walletId: yup.number().positive().optional(),
});

export async function getInvestmentPlans(formData: any) {
  try {
    await getSequelizeInstance();

    const validatedFields = yupValidator(getInvestmentPlansSchema, formData);
    if (!validatedFields.isSuccess) {
      return {
        errors: validatedFields.errors,
      };
    }

    const { userId, type, walletId } = validatedFields.data!;

    // Build where conditions
    const whereConditions: any = {
      isActive: true,
    };

    if (type) {
      whereConditions.type = type;
    }

    if (walletId) {
      whereConditions.walletId = walletId;
    }

    // Get investment plans with wallet info
    const plans = await InvestmentPlans.findAll({
      where: whereConditions,
      include: [
        {
          model: Wallets,
          as: "wallet",
          attributes: ["id", "name", "shortName", "icon", "type"],
        },
      ],
      order: [
        ["type", "ASC"],
        ["minAmount", "ASC"],
      ],
    });

    // Get user-specific settings for these plans
    const userSettings = await UserInvestmentSettings.findAll({
      where: {
        userId,
        planId: plans.map((plan) => plan.id),
      },
    });

    // Create settings map for quick lookup
    const settingsMap = new Map();
    userSettings.forEach((setting) => {
      settingsMap.set(setting.planId, setting);
    });

    // Get global user settings (planId = null)
    const globalSettings = await UserInvestmentSettings.findOne({
      where: {
        userId,
        planId: null,
      },
    });

    // Process plans with user-specific data
    const processedPlans = plans.map((plan) => {
      const userSetting = settingsMap.get(plan.id);
      const canInvest =
        userSetting?.canInvest ?? globalSettings?.canInvest ?? true;
      const customReturnRate =
        userSetting?.customReturnRate ?? globalSettings?.customReturnRate;
      const maxInvestmentAmount =
        userSetting?.maxInvestmentAmount ?? globalSettings?.maxInvestmentAmount;
      const signalRangeMin = userSetting?.signalRangeMin ?? plan.signalRangeMin;
      const signalRangeMax = userSetting?.signalRangeMax ?? plan.signalRangeMax;

      return {
        id: plan.id,
        name: plan.name,
        type: plan.type,
        description: plan.description,
        minAmount: plan.minAmount,
        maxAmount: maxInvestmentAmount
          ? Math.min(plan.maxAmount, maxInvestmentAmount)
          : plan.maxAmount,
        duration: plan.duration,
        returnRate: customReturnRate ?? plan.returnRate,
        signalRangeMin,
        signalRangeMax,
        wallet: {
          id: plan.wallet.id,
          name: plan.wallet.name,
          shortName: plan.wallet.shortName,
          icon: plan.wallet.icon,
          type: plan.wallet.type,
        },
        userSettings: {
          canInvest,
          hasCustomSettings: !!userSetting,
          isRestricted: !canInvest || !!maxInvestmentAmount,
        },
      };
    });

    // Filter out plans user cannot invest in
    const availablePlans = processedPlans.filter(
      (plan) => plan.userSettings.canInvest
    );

    return {
      success: true,
      data: {
        plans: availablePlans,
        totalPlans: availablePlans.length,
        plansByType: {
          forex: availablePlans.filter((p) => p.type === "forex"),
          crypto_mining: availablePlans.filter(
            (p) => p.type === "crypto_mining"
          ),
        },
      },
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
