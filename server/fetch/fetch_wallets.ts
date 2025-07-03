import { unstable_cache, revalidateTag } from "next/cache";
import getSequelizeInstance from "@/database/db";
import { WalletBalances } from "@/database/models/wallet_balances";
import { Wallets } from "@/database/models/wallets";
import { InferAttributes } from "sequelize";

export const fetchUserWallets = async (
  id: number | string
): Promise<InferAttributes<WalletBalances>[]> => {
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
            as: "wallet",
          },
        ],
      });

      return _wallets.map((e) => e.toJSON());
    },
    [],
    {
      tags: ["user_wallets"],
    }
  );

  return (await fetch(id)).map((e) => e);
};

export async function revalidateUserWallet() {
  revalidateTag("user_wallets");
}
