"use server";

import getSequelizeInstance from "@/database/db";
import { Transactions } from "@/database/models/transactions";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { momentInstance } from "@/lib/momentDateTime";
import { randomUUID } from "crypto";
import moment from "moment";
import { revalidatePath } from "next/cache";
import * as Sequelize from "sequelize";
import logger from "@/lib/logger";

export async function withdraw_action(data: {
  user_id: number;
  type: "crypto" | "stock" | "share" | "fiat";
  fiatMethod?: "wire" | "ACH" | "internal";
  from: {
    wallet_id: number;
    fiat: number;
    converted: number;
    currency: string;
  };
  to: {
    wallet_address?: string;
    email_address?: string;
    account?: {
      name: string;
      account_number: number;
      routing: string;
    };
  };
}) {
  var t = await (await getSequelizeInstance()).transaction();
  var errors = {};

  logger(data);

  try {
    var user = await Users.findByPk(data.user_id);
    if (user == null) {
      throw {
        success: false,
        message: "User not found",
      };
    }

    // if (user.canTransfer != 1) {
    //   throw {
    //     success: false,
    //     message: "Action not permitted",
    //   };
    // }

    if (data.type === "fiat") {
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
          walletId: data.from.wallet_id,
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

      await Transactions.create({
        paymentMethod: "crypto",
        userId: user.id,
        status: "pending",
        walletId: data.from.wallet_id,
        amount: data.from.fiat,
        reference: randomUUID(),
        narration: `${data.from.converted} ${data.from.currency} withdrawal to ${data.to.wallet_address}`,
        beneficiaryName: data.to.wallet_address,
        createdAt: momentInstance().toDate(),
      });
    }

    await t.commit();
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `You've successfully withdrew ${data.from.converted} ${data.from.currency} ${data.to.wallet_address}.\nThanks for banking with us.`,
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
