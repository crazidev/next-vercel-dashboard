import * as Sequelize from 'sequelize';
import {
   CreationOptional,
   DataTypes,
   InferCreationAttributes, 
   InferAttributes,
   Model
} from 'sequelize';

import type { Banks, BanksId } from './banks';
import type { Users, UsersId } from './users';
import type { Wallets, WalletsId } from './wallets';

export class Transactions extends Model<
      InferAttributes<Transactions>,
      InferCreationAttributes<Transactions>
> {
    declare amount: number;
    declare status?: 'pending' | 'completed';
    declare paymentMethod: 'bank_transfer' | 'crypto' | 'inter_transfer';
    declare narration?: string;
    declare reference?: string;
    declare userId?: number;
    declare walletId?: number;
    declare walletNetwork?: string;
    declare id: CreationOptional<number>;
    declare beneficiaryId?: number;
    declare beneficiaryName?: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare bankId?: number;

   // Transactions belongsTo Banks via bankId
   declare bank?: Sequelize.NonAttribute<Banks>
   declare getBank: Sequelize.BelongsToGetAssociationMixin<Banks>;
   declare setBank: Sequelize.BelongsToSetAssociationMixin<Banks, number>;
   declare createBank: Sequelize.BelongsToCreateAssociationMixin<Banks>;
   // Transactions hasMany Wallets via transactionsId
   declare transactionsWallets?: Sequelize.NonAttribute<Wallets[]>;
   declare getTransactionsWallets: Sequelize.HasManyGetAssociationsMixin<Wallets>;
   declare setTransactionsWallets: Sequelize.HasManySetAssociationsMixin<Wallets, number>;
   declare addTransactionsWallet: Sequelize.HasManyAddAssociationMixin<Wallets, number>;
   declare addTransactionsWallets: Sequelize.HasManyAddAssociationsMixin<Wallets, number>;
   declare createTransactionsWallet: Sequelize.HasManyCreateAssociationMixin<Wallets, 'transactionsId'>;
   declare removeTransactionsWallet: Sequelize.HasManyRemoveAssociationMixin<Wallets, number>;
   declare removeTransactionsWallets: Sequelize.HasManyRemoveAssociationsMixin<Wallets, number>;
   declare hasTransactionsWallet: Sequelize.HasManyHasAssociationMixin<Wallets, number>;
   declare hasTransactionsWallets: Sequelize.HasManyHasAssociationsMixin<Wallets, number>;
   declare countTransactionsWallets: Sequelize.HasManyCountAssociationsMixin;
   // Transactions belongsTo Users via userId
   declare user?: Sequelize.NonAttribute<Users>
   declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
   declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;
   declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;
   // Transactions belongsTo Users via beneficiaryId
   declare beneficiary?: Sequelize.NonAttribute<Users>
   declare getBeneficiary: Sequelize.BelongsToGetAssociationMixin<Users>;
   declare setBeneficiary: Sequelize.BelongsToSetAssociationMixin<Users, number>;
   declare createBeneficiary: Sequelize.BelongsToCreateAssociationMixin<Users>;
   // Transactions belongsTo Wallets via walletId
   declare wallet?: Sequelize.NonAttribute<Wallets>
   declare getWallet: Sequelize.BelongsToGetAssociationMixin<Wallets>;
   declare setWallet: Sequelize.BelongsToSetAssociationMixin<Wallets, number>;
   declare createWallet: Sequelize.BelongsToCreateAssociationMixin<Wallets>;

   static initModel(sequelize: Sequelize.Sequelize): typeof Transactions {
      return Transactions.init({
      amount: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      status: {
         type: DataTypes.ENUM('pending','completed'),
         allowNull: true
      },
      paymentMethod: {
         type: DataTypes.ENUM('bank_transfer','crypto','inter_transfer'),
         allowNull: false,
         field: 'payment_method'
      },
      narration: {
         type: DataTypes.STRING(255),
         allowNull: true
      },
      reference: {
         type: DataTypes.CHAR(36),
         allowNull: true
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
      walletNetwork: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'wallet_network'
      },
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },
      beneficiaryId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'users',
            key: 'id'
         },
         field: 'beneficiary_id'
      },
      beneficiaryName: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'beneficiary_name'
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
      bankId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'banks',
            key: 'id'
         },
         field: 'bank_id'
      }
   }, {
      sequelize,
      tableName: 'transactions',
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
         {
            name: "beneficiary_id",
            using: "BTREE",
            fields: [
               { name: "beneficiary_id" },
            ]
         },
         {
            name: "bank_id",
            using: "BTREE",
            fields: [
               { name: "bank_id" },
            ]
         },
      ]
   });
   }
}
