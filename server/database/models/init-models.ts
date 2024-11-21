import type { Sequelize } from "sequelize";
import { Alert } from "./alert";
import { Banks } from "./banks";
import { LivechatSession } from "./livechat_session";
import { Livechats } from "./livechats";
import { Passkey } from "./passkey";
import { Transactions } from "./transactions";
import { Users } from "./users";
import { VerificationTokens } from "./verification_tokens";
import { Versions } from "./versions";
import { WalletBalances } from "./wallet_balances";
import { Wallets } from "./wallets";

export {
   Alert,
   Banks,
   LivechatSession,
   Livechats,
   Passkey,
   Transactions,
   Users,
   VerificationTokens,
   Versions,
   WalletBalances,
   Wallets,
};
export function initModels(sequelize: Sequelize) {
   Alert.initModel(sequelize);
   Banks.initModel(sequelize);
   LivechatSession.initModel(sequelize);
   Livechats.initModel(sequelize);
   Passkey.initModel(sequelize);
   Transactions.initModel(sequelize);
   Users.initModel(sequelize);
   VerificationTokens.initModel(sequelize);
   Versions.initModel(sequelize);
   WalletBalances.initModel(sequelize);
   Wallets.initModel(sequelize);

   Transactions.belongsTo(Banks, { as: "bank", foreignKey: "bankId"});
   Banks.hasMany(Transactions, { as: "transactions", foreignKey: "bankId"});
   Livechats.belongsTo(LivechatSession, { as: "session", foreignKey: "sessionId"});
   LivechatSession.hasMany(Livechats, { as: "livechats", foreignKey: "sessionId"});
   Alert.belongsTo(Users, { as: "user", foreignKey: "userId"});
   Users.hasMany(Alert, { as: "alerts", foreignKey: "userId"});
   Transactions.belongsTo(Users, { as: "user", foreignKey: "userId"});
   Users.hasMany(Transactions, { as: "transactions", foreignKey: "userId"});
   Transactions.belongsTo(Users, { as: "beneficiary", foreignKey: "beneficiaryId"});
   Users.hasMany(Transactions, { as: "beneficiaryTransactions", foreignKey: "beneficiaryId"});
   VerificationTokens.belongsTo(Users, { as: "user", foreignKey: "userId"});
   Users.hasMany(VerificationTokens, { as: "verificationTokens", foreignKey: "userId"});
   WalletBalances.belongsTo(Users, { as: "user", foreignKey: "userId"});
   Users.hasMany(WalletBalances, { as: "walletBalances", foreignKey: "userId"});
   Transactions.belongsTo(Wallets, { as: "wallet", foreignKey: "walletId"});
   Wallets.hasMany(Transactions, { as: "transactions", foreignKey: "walletId"});
   WalletBalances.belongsTo(Wallets, { as: "wallet", foreignKey: "walletId"});
   Wallets.hasMany(WalletBalances, { as: "walletBalances", foreignKey: "walletId"});

   return {
      Alert: Alert,
      Banks: Banks,
      LivechatSession: LivechatSession,
      Livechats: Livechats,
      Passkey: Passkey,
      Transactions: Transactions,
      Users: Users,
      VerificationTokens: VerificationTokens,
      Versions: Versions,
      WalletBalances: WalletBalances,
      Wallets: Wallets,
   };
}
