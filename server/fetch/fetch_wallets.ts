import { unstable_cache, revalidateTag } from "next/cache";
import getSequelizeInstance from "server/database/db";
import { WalletBalances } from "server/database/models/wallet_balances";
import { Wallets } from "server/database/models/wallets";

export const getUserWallets = async (
  user_id: number | string
): Promise<WalletBalances[]> => {
  var fetch = unstable_cache(
    async (id) => {
      await getSequelizeInstance();
      var _wallets = await WalletBalances.findAll({
        where: {
          userId: id,
        },
        include: [
          {
            model: Wallets,
            as: 'wallet'
          },
        ],
      });

      return _wallets;
    },
    [],
    {
      tags: ["user_wallets"],
    }
  );

  return await fetch(user_id);
};

export async function revalidateUserWallet() {
  revalidateTag("user_wallets");
}
