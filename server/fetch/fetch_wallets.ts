import { unstable_cache, revalidateTag } from "next/cache";
import getSequelizeInstance from "@/database/db";
import { WalletBalances } from "@/database/models/wallet_balances";
import { Wallets } from "@/database/models/wallets";

export const fetchUserWallets = async (
  id: number | string
): Promise<WalletBalances[]> => {
  var fetch = unstable_cache(
    async (id) => {
      await getSequelizeInstance();
      var _wallets = await WalletBalances.findAll({
        where: {
          // userId: id,
        },
        include: [
          {
            model: Wallets,
            as: "wallet",
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

  return (await fetch(id)).map((e)=> e);
};

export async function revalidateUserWallet() {
  revalidateTag("user_wallets");
}
