"use server";

import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";

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
