"use server";

import getSequelizeInstance from "@/database/db";
import { Transactions } from "@/database/models/transactions";
import { randomUUID } from "crypto";
import logger from "@/lib/logger";

export async function admin_add_transaction_action({
  narration,
  amount,
  userId,
  beneficiaryName,
  status,
  type,
  date,
  paymentMethod,
  walletId,
}) {
  var t = await (await getSequelizeInstance()).transaction();
  try {
    await Transactions.create(
      {
        narration: narration,
        amount: amount,
        status: status,
        userId: type == "debit" ? userId : null,
        createdAt: date,
        beneficiaryId: type == "credit" ? userId : null,
        beneficiaryName: beneficiaryName,
        paymentMethod: paymentMethod,
        walletId: walletId,
        reference: randomUUID(),
      },
      {
        transaction: t,
        logging(sql, timing) {
          logger(sql);
        },
      }
    );

    await t.commit();
    // revalidatePath("/admin/users");

    return {
      success: true,
      message: "Transaction created successfully",
    };
  } catch (error) {
    await t.rollback();
    console.error(error);
    return {
      error: "Internal server error",
    };
  }
}
