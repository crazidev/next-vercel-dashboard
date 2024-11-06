import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import  { Transactions } from './transactions';
import  { WalletBalances } from './wallet_balances';

export class Wallets extends Model<
 Sequelize.InferAttributes<Wallets>,
 Sequelize.InferCreationAttributes<Wallets>
> {
   declare id: number;
   declare name?: string;
   declare shortName?: string;
   declare walletAddress?: string;
   declare network?: string;
   declare createdAt?: Date;
   declare updatedAt?: Date;
   declare walletBalanceId?: number;
   declare transactionsId?: number;
   declare type: 'crypto' | 'stock' | 'share';
   declare icon?: string;

   static initModel(sequelize: Sequelize.Sequelize): typeof Wallets {
      return Wallets.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      name: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      shortName: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'short_name'
      },

      walletAddress: {
         type: DataTypes.TEXT,
         allowNull: true,
         field: 'wallet_address'
      },

      network: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
         field: 'created_at'
      },

      updatedAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'updated_at'
      },

      walletBalanceId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: true,
         references: {
            model: 'wallet_balances',
            key: 'id'
         },
         field: 'wallet_balance_id'
      },

      transactionsId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'transactions',
            key: 'id'
         },
         field: 'transactions_id'
      },

      type: {
         type: DataTypes.ENUM('crypto','stock','share'),
         allowNull: false
      },

      icon: {
         type: DataTypes.TEXT,
         allowNull: true
      },
   }, {
      sequelize,
      tableName: 'wallets',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      indexes: [
         {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
               { name: "id" },
            ]
         },
         {
            name: "id",
            unique: true,
            using: "BTREE",
            fields: [
               { name: "id" },
            ]
         },
         {
            name: "wallets_wallet_balance_id_transactions_id_unique",
            unique: true,
            using: "BTREE",
            fields: [
               { name: "wallet_balance_id" },
               { name: "transactions_id" },
            ]
         },
         {
            name: "transactions_id",
            using: "BTREE",
            fields: [
               { name: "transactions_id" },
            ]
         },
      ]
   });
   }

   // Wallets belongsTo Transactions via transactionsId
   declare transactionsTransaction?: Transactions;
   declare getTransactionsTransaction: Sequelize.BelongsToGetAssociationMixin<Transactions>;
   declare setTransactionsTransaction: Sequelize.BelongsToSetAssociationMixin<Transactions, number>;
   declare createTransactionsTransaction: Sequelize.BelongsToCreateAssociationMixin<Transactions>;

   // Wallets belongsTo WalletBalances via walletBalanceId
   declare walletBalanceWalletBalance?: WalletBalances;
   declare getWalletBalanceWalletBalance: Sequelize.BelongsToGetAssociationMixin<WalletBalances>;
   declare setWalletBalanceWalletBalance: Sequelize.BelongsToSetAssociationMixin<WalletBalances, number>;
   declare createWalletBalanceWalletBalance: Sequelize.BelongsToCreateAssociationMixin<WalletBalances>;

   // Wallets hasMany Transactions via walletId
   declare transactions: Sequelize.NonAttribute<Transactions[]>;
   declare getTransactions: Sequelize.HasManyGetAssociationsMixin<Transactions>;
   declare setTransactions: Sequelize.HasManySetAssociationsMixin<Transactions, number>;
   declare addTransaction: Sequelize.HasManyAddAssociationMixin<Transactions, number>;
   declare addTransactions: Sequelize.HasManyAddAssociationsMixin<Transactions, number>;
   declare createTransaction: Sequelize.HasManyCreateAssociationMixin<Transactions>;
   declare removeTransaction: Sequelize.HasManyRemoveAssociationMixin<Transactions, number>;
   declare removeTransactions: Sequelize.HasManyRemoveAssociationsMixin<Transactions, number>;
   declare hasTransaction: Sequelize.HasManyHasAssociationMixin<Transactions, number>;
   declare hasTransactions: Sequelize.HasManyHasAssociationsMixin<Transactions, number>;
   declare countTransactions: Sequelize.HasManyCountAssociationsMixin;

   // Wallets hasMany WalletBalances via walletId
   declare walletBalances: Sequelize.NonAttribute<WalletBalances[]>;
   declare getWalletBalances: Sequelize.HasManyGetAssociationsMixin<WalletBalances>;
   declare setWalletBalances: Sequelize.HasManySetAssociationsMixin<WalletBalances, number>;
   declare addWalletBalance: Sequelize.HasManyAddAssociationMixin<WalletBalances, number>;
   declare addWalletBalances: Sequelize.HasManyAddAssociationsMixin<WalletBalances, number>;
   declare createWalletBalance: Sequelize.HasManyCreateAssociationMixin<WalletBalances>;
   declare removeWalletBalance: Sequelize.HasManyRemoveAssociationMixin<WalletBalances, number>;
   declare removeWalletBalances: Sequelize.HasManyRemoveAssociationsMixin<WalletBalances, number>;
   declare hasWalletBalance: Sequelize.HasManyHasAssociationMixin<WalletBalances, number>;
   declare hasWalletBalances: Sequelize.HasManyHasAssociationsMixin<WalletBalances, number>;
   declare countWalletBalances: Sequelize.HasManyCountAssociationsMixin;

}
