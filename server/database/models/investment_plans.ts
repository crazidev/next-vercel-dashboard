import * as Sequelize from "sequelize";
import { DataTypes, Model, CreationOptional } from "sequelize";
import { Wallets } from "./init-models";
import { UserInvestments } from "./user_investments";

export class InvestmentPlans extends Model<
  Sequelize.InferAttributes<InvestmentPlans>,
  Sequelize.InferCreationAttributes<InvestmentPlans>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: "forex" | "crypto_mining";
  declare walletId: number;
  declare minAmount: number;
  declare maxAmount: number;
  declare duration: number; // in hours
  declare returnRate: number; // percentage
  declare description?: string;
  declare isActive: boolean;
  declare signalRangeMin: number; // default 70
  declare signalRangeMax: number; // default 90
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof InvestmentPlans {
    return InvestmentPlans.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        type: {
          type: DataTypes.ENUM("forex", "crypto_mining"),
          allowNull: false,
        },

        walletId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "wallets",
            key: "id",
          },
          field: "wallet_id",
        },

        minAmount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "min_amount",
        },

        maxAmount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "max_amount",
        },

        duration: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "Duration in hours",
        },

        returnRate: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
          field: "return_rate",
          comment: "Return percentage",
        },

        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },

        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          field: "is_active",
        },

        signalRangeMin: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 70,
          field: "signal_range_min",
        },

        signalRangeMax: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 90,
          field: "signal_range_max",
        },

        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
          field: "created_at",
        },

        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "updated_at",
        },
      },
      {
        sequelize,
        tableName: "investment_plans",
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
            name: "type_active_index",
            using: "BTREE",
            fields: [{ name: "type" }, { name: "is_active" }],
          },
          {
            name: "wallet_id_index",
            using: "BTREE",
            fields: [{ name: "wallet_id" }],
          },
        ],
      }
    );
  }

  // InvestmentPlans belongsTo Wallets
  declare wallet: Sequelize.NonAttribute<Wallets>;
  declare getWallet: Sequelize.BelongsToGetAssociationMixin<Wallets>;
  declare setWallet: Sequelize.BelongsToSetAssociationMixin<Wallets, number>;

  // InvestmentPlans hasMany UserInvestments
  declare userInvestments: Sequelize.NonAttribute<UserInvestments[]>;
  declare getUserInvestments: Sequelize.HasManyGetAssociationsMixin<UserInvestments>;
  declare setUserInvestments: Sequelize.HasManySetAssociationsMixin<
    UserInvestments,
    number
  >;
  declare addUserInvestment: Sequelize.HasManyAddAssociationMixin<
    UserInvestments,
    number
  >;
  declare createUserInvestment: Sequelize.HasManyCreateAssociationMixin<UserInvestments>;
}
