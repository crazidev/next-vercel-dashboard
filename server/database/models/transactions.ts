import * as Sequelize from "sequelize";
import { DataTypes, Model, CreationOptional } from "sequelize";
import { Banks } from "./banks";
import { Users } from "./users";
import { Wallets } from "./wallets";

export class Transactions extends Model<
  Sequelize.InferAttributes<Transactions>,
  Sequelize.InferCreationAttributes<Transactions>
> {
  declare amount: number;
  declare amount_converted: number;
  declare status?: "pending" | "completed";
  declare paymentMethod: "bank_transfer" | "crypto" | "inter_transfer";
  declare narration?: string;
  declare reference?: string;
  declare userId?: number;
  declare walletId?: number;
  declare id: CreationOptional<number>;
  declare beneficiaryId?: number;
  declare beneficiaryName?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare bankId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Transactions {
    return Transactions.init(
      {
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount_converted: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },

        status: {
          type: DataTypes.ENUM("pending", "completed"),
          allowNull: true,
        },

        paymentMethod: {
          type: DataTypes.ENUM("bank_transfer", "crypto", "inter_transfer"),
          allowNull: false,
          field: "payment_method",
        },

        narration: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },

        reference: {
          type: DataTypes.CHAR(36),
          allowNull: true,
        },

        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
          field: "user_id",
        },

        walletId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "wallets",
            key: "id",
          },
          field: "wallet_id",
        },

        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        beneficiaryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
          field: "beneficiary_id",
        },

        beneficiaryName: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: "beneficiary_name",
        },

        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "created_at",
        },

        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "updated_at",
        },

        bankId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "banks",
            key: "id",
          },
          field: "bank_id",
        },
      },
      {
        sequelize,
        tableName: "transactions",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "user_id",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
          {
            name: "wallet_id",
            using: "BTREE",
            fields: [{ name: "wallet_id" }],
          },
          {
            name: "beneficiary_id",
            using: "BTREE",
            fields: [{ name: "beneficiary_id" }],
          },
          {
            name: "bank_id",
            using: "BTREE",
            fields: [{ name: "bank_id" }],
          },
        ],
      }
    );
  }

  // Transactions belongsTo Banks via bankId
  declare bank?: Banks;
  declare getBank: Sequelize.BelongsToGetAssociationMixin<Banks>;
  declare setBank: Sequelize.BelongsToSetAssociationMixin<Banks, number>;
  declare createBank: Sequelize.BelongsToCreateAssociationMixin<Banks>;

  // Transactions belongsTo Users via userId
  declare user?: Users;
  declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
  declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;
  declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;

  // Transactions belongsTo Users via beneficiaryId
  declare beneficiary?: Users;
  declare getBeneficiary: Sequelize.BelongsToGetAssociationMixin<Users>;
  declare setBeneficiary: Sequelize.BelongsToSetAssociationMixin<Users, number>;
  declare createBeneficiary: Sequelize.BelongsToCreateAssociationMixin<Users>;

  // Transactions belongsTo Wallets via walletId
  declare wallet?: Wallets;
  declare getWallet: Sequelize.BelongsToGetAssociationMixin<Wallets>;
  declare setWallet: Sequelize.BelongsToSetAssociationMixin<Wallets, number>;
  declare createWallet: Sequelize.BelongsToCreateAssociationMixin<Wallets>;
}
