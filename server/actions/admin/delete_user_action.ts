"use server";

import getSequelizeInstance from "@/database/db";
import { Passkey } from "@/database/models/passkey";
import { Transactions } from "@/database/models/transactions";
import { Users } from "@/database/models/users";
import { VerificationTokens } from "@/database/models/verification_tokens";
import { WalletBalances } from "@/database/models/wallet_balances";
import { revalidatePath } from "next/cache";

export async function admin_delete_user_action({ userId }) {
  var t = await (await getSequelizeInstance()).transaction();
  try {
    await Users.destroy({
      where: {
        id: userId,
      },
      transaction: t,
    });

    await WalletBalances.destroy({
      where: {
        userId: userId,
      },
      transaction: t,
    });

    await VerificationTokens.destroy({
      where: {
        userId: userId,
      },
      transaction: t,
    });

    await Passkey.destroy({
      where: {
        userId: userId,
      },
      transaction: t,
    });

    await Transactions.destroy({
      where: {
        userId: userId,
      },
      transaction: t,
    });

    await t.commit();
    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Updated successfully",
    };
  } catch (error) {
    await t.rollback();
    console.error(error);
    return {
      error: "Internal server error",
    };
  }
}
