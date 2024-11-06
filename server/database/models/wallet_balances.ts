import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import  { Users } from './users';
import  { Wallets } from './wallets';

export class WalletBalances extends Model<
 Sequelize.InferAttributes<WalletBalances>,
 Sequelize.InferCreationAttributes<WalletBalances>
> {
   declare id: number;
   declare userId?: number;
   declare walletId?: number;
   declare balance?: number;
   declare createdAt?: Date;
   declare updatedAt?: Date;

   static initModel(sequelize: Sequelize.Sequelize): typeof WalletBalances {
      return WalletBalances.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true
      },

      userId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'users',
            key: 'id'
         },
         field: 'user_id'
      },

      walletId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'wallets',
            key: 'id'
         },
         field: 'wallet_id'
      },

      balance: {
         type: DataTypes.INTEGER,
         allowNull: true
      },

      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'created_at'
      },

      updatedAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'updated_at'
      },
   }, {
      sequelize,
      tableName: 'wallet_balances',
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
            name: "user_id",
            using: "BTREE",
            fields: [
               { name: "user_id" },
            ]
         },
         {
            name: "wallet_id",
            using: "BTREE",
            fields: [
               { name: "wallet_id" },
            ]
         },
      ]
   });
   }

   // WalletBalances belongsTo Users via userId
   declare user?: Users;
   declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
   declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;
   declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;

   // WalletBalances hasMany Wallets via walletBalanceId
   declare walletBalanceWallets: Sequelize.NonAttribute<Wallets[]>;
   declare getWalletBalanceWallets: Sequelize.HasManyGetAssociationsMixin<Wallets>;
   declare setWalletBalanceWallets: Sequelize.HasManySetAssociationsMixin<Wallets, number>;
   declare addWalletBalanceWallet: Sequelize.HasManyAddAssociationMixin<Wallets, number>;
   declare addWalletBalanceWallets: Sequelize.HasManyAddAssociationsMixin<Wallets, number>;
   declare createWalletBalanceWallet: Sequelize.HasManyCreateAssociationMixin<Wallets>;
   declare removeWalletBalanceWallet: Sequelize.HasManyRemoveAssociationMixin<Wallets, number>;
   declare removeWalletBalanceWallets: Sequelize.HasManyRemoveAssociationsMixin<Wallets, number>;
   declare hasWalletBalanceWallet: Sequelize.HasManyHasAssociationMixin<Wallets, number>;
   declare hasWalletBalanceWallets: Sequelize.HasManyHasAssociationsMixin<Wallets, number>;
   declare countWalletBalanceWallets: Sequelize.HasManyCountAssociationsMixin;

   // WalletBalances belongsTo Wallets via walletId
   declare wallet?: Wallets;
   declare getWallet: Sequelize.BelongsToGetAssociationMixin<Wallets>;
   declare setWallet: Sequelize.BelongsToSetAssociationMixin<Wallets, number>;
   declare createWallet: Sequelize.BelongsToCreateAssociationMixin<Wallets>;

}
