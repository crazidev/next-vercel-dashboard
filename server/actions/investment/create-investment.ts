"use server";
import getSequelizeInstance from "@/database/db";
import { yupValidator } from "@/server/extra/yup";
import * as yup from "yup";
import { UserInvestments } from "@/database/models/user_investments";
import { InvestmentPlans } from "@/database/models/investment_plans";
import { UserInvestmentSettings } from "@/database/models/user_investment_settings";
import { Transactions } from "@/database/models/transactions";
import { WalletBalances, Wallets } from "@/database/models/init-models";

const createInvestmentSchema = yup.object({
  userId: yup.number().required("User ID is required").positive(),
  planId: yup.number().required("Plan ID is required").positive(),
  amount: yup
    .number()
    .required("Amount is required")
    .positive()
    .min(1, "Amount must be greater than 0"),
});

export async function createInvestment(formData: any) {
  const db = await getSequelizeInstance();
  const transaction = await db.transaction();

  try {
    const validatedFields = yupValidator(createInvestmentSchema, formData);
    if (!validatedFields.isSuccess) {
      await transaction.rollback();
      return {
        errors: validatedFields.errors,
      };
    }

    const { userId, planId, amount } = validatedFields.data!;

    // Get investment plan with wallet info
    const plan = await InvestmentPlans.findOne({
      where: {
        id: planId,
        isActive: true,
      },
      include: [{ model: Wallets, as: "wallet" }],
      transaction,
    });

    if (!plan) {
      await transaction.rollback();
      return {
        errors: {
          planId: "Investment plan not found or inactive",
        },
      };
    }

    // Check user investment permissions
    const userSetting = await UserInvestmentSettings.findOne({
      where: { userId, planId },
      transaction,
    });

    const globalSettings = await UserInvestmentSettings.findOne({
      where: { userId, planId: null },
      transaction,
    });

    const canInvest =
      userSetting?.canInvest ?? globalSettings?.canInvest ?? true;
    if (!canInvest) {
      await transaction.rollback();
      return {
        errors: {
          userId: "You are not allowed to invest in this plan",
        },
      };
    }

    // Validate investment amount
    const maxInvestmentAmount =
      userSetting?.maxInvestmentAmount ?? globalSettings?.maxInvestmentAmount;
    const effectiveMaxAmount = maxInvestmentAmount
      ? Math.min(plan.maxAmount, maxInvestmentAmount)
      : plan.maxAmount;

    if (amount < plan.minAmount) {
      await transaction.rollback();
      return {
        errors: {
          amount: `Minimum investment amount is $${plan.minAmount}`,
        },
      };
    }

    if (amount > effectiveMaxAmount) {
      await transaction.rollback();
      return {
        errors: {
          amount: `Maximum investment amount is $${effectiveMaxAmount}`,
        },
      };
    }

    // Check user wallet balance
    const userWallet = await WalletBalances.findOne({
      where: {
        userId,
        walletId: plan.walletId,
      },
      transaction,
    });

    if (!userWallet || userWallet.balance < amount) {
      await transaction.rollback();
      return {
        errors: {
          amount: "Insufficient wallet balance",
        },
      };
    }

    // Calculate expected return
    const customReturnRate =
      userSetting?.customReturnRate ??
      globalSettings?.customReturnRate ??
      plan.returnRate;
    const expectedReturn = Math.floor((amount * customReturnRate) / 100);

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date(
      startDate.getTime() + plan.duration * 60 * 60 * 1000
    ); // duration in hours

    // Generate unique reference
    const reference = `INV-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Create investment record
    const investment = await UserInvestments.create(
      {
        userId,
        planId,
        amount,
        expectedReturn,
        currentReturn: 0,
        status: "active",
        startDate,
        endDate,
        customReturnRate:
          customReturnRate !== plan.returnRate ? customReturnRate : null,
        reference,
        lastProfitUpdate: startDate,
      },
      { transaction }
    );

    // Deduct amount from user wallet
    await userWallet.decrement("balance", {
      by: amount,
      transaction,
    });

    // Create transaction record
    await Transactions.create(
      {
        userId,
        walletId: plan.walletId,
        amount: -amount, // Negative for deduction
        status: "completed",
        paymentMethod: "inter_transfer",
        narration: `Investment in ${plan.name}`,
        reference: reference,
        beneficiaryName: plan.name,
      },
      { transaction }
    );

    await transaction.commit();

    return {
      success: true,
      message: "Investment created successfully",
      data: {
        investmentId: investment.id,
        reference: investment.reference,
        amount: investment.amount,
        expectedReturn: investment.expectedReturn,
        startDate: investment.startDate,
        endDate: investment.endDate,
        planName: plan.name,
        walletName: plan.wallet.name,
        duration: plan.duration,
        returnRate: customReturnRate,
      },
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return {
      errors: {
        root: "Internal server error",
      },
    };
  }
}
