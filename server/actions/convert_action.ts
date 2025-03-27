"use server";

import getSequelizeInstance from "@/database/db";
import { Transactions } from "@/database/models/transactions";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import * as Sequelize from "sequelize";
import logger from "@/lib/logger";

export async function convert_action(data: {
  user_id: number;
  fromType: "main" | "wallet";
  from: {
    wallet_id: number;
    fiat: number;
    converted: number;
    currency: string;
  };
  to: {
    wallet_id: number;
    fiat: number;
    converted: number;
    currency: string;
  };
}) {
  var t = await (await getSequelizeInstance()).transaction();
  var errors = {};

  // logger(data);

  try {
    var user = await Users.findByPk(data.user_id);
    if (user == null) {
      throw {
        success: false,
        message: "User not found",
      };
    }

    if (data.fromType === "main") {
      if (user.accountBalance < data.from.fiat) {
        throw {
          success: false,
          message: "Insufficient balance",
        };
      }

      await user.decrement("accountBalance", {
        by: data.from.fiat,
        transaction: t,
      });
    } else {
      var wallet = await WalletBalances.findOne({
        where: {
          id: data.from.wallet_id,
          userId: data.user_id,
        },
      });

      if (wallet == null) {
        throw {
          success: false,
          message: "Wallet not found",
        };
      } else if (wallet.balance < data.from.fiat) {
        throw {
          success: false,
          message: "Insufficient balance",
        };
      }

      await wallet.decrement("balance", {
        by: data.from.fiat,
        transaction: t,
      });
    }

    if (data.to.wallet_id == -1) {
      await user.increment("accountBalance", {
        by: data.to.fiat,
        transaction: t,
      });
    } else {
      var wallet = await WalletBalances.findOne({
        where: {
          id: data.to.wallet_id,
          userId: data.user_id,
        },
      });

      if (wallet == null) {
        throw {
          success: false,
          message: "Wallet not found",
        };
      }

      await wallet.increment("balance", {
        by: data.to.fiat,
        transaction: t,
      });
    }

    await t.commit();

    revalidatePath("/dashboard");

    return {
      success: true,
      message: `You've successfully converted ${data.from.converted} ${data.from.currency} to ${data.to.converted} ${data.to.currency}`,
    };
  } catch (error) {
    t.rollback();
    logger(error);
    return {
      success: false,
      errors: (error as any).message ?? error,
    };
  }
}
