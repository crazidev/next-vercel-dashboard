"use server";

import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { yupValidator } from "@/server/extra/yup";
import { loginActionScheme } from "@/server/scheme/login_scheme";
import { revalidatePath } from "next/cache";

export async function admin_update_user_balance_action({
  amount,
  wallet,
  userId,
}) {
  var t = await (await getSequelizeInstance()).transaction();
  try {
    if (wallet == -1) {
      await Users.update(
        { accountBalance: amount },
        {
          where: {
            id: userId,
          },
          transaction: t,
        }
      );
    } else {
      var walletBalance = await WalletBalances.findOne({
        where: { id: wallet },
      });

      if (walletBalance) {
        await WalletBalances.update(
          {
            balance: amount,
          },
          {
            where: {
              id: wallet,
            },
            transaction: t,
          }
        );
      }
    }

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
