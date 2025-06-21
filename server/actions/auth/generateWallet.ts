import getSequelizeInstance from "@/database/db";
import { WalletBalances } from "@/database/models/wallet_balances";
import { Wallets } from "@/database/models/wallets";
import { momentInstance } from "@/lib/momentDateTime";

export async function generateWallet({ userId }) {
  await getSequelizeInstance();
  var walletToCreate: WalletBalances[] = [];

  var userWallets = await WalletBalances.findAll({
    where: {
      userId: userId,
    },
  });

  var allWallets = await Wallets.findAll();

  allWallets.forEach((wallet) => {
    var walletExist = userWallets.find(
      (walletBalance: WalletBalances) => walletBalance.walletId == wallet.id
    );

    if (!walletExist) {
      // @ts-ignore
      walletToCreate.push({
        userId: userId,
        walletId: wallet.id,
        balance: 0,
        createdAt: momentInstance().toDate(),
      });
    }
  });

  await WalletBalances.bulkCreate(walletToCreate);
}
