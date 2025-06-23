import * as Sequelize from "sequelize";
import { DataTypes, Model, CreationOptional } from "sequelize";
import { InvestmentPlans } from "./investment_plans";
import { Users } from "./users";

export class UserInvestmentSettings extends Model<
  Sequelize.InferAttributes<UserInvestmentSettings>,
  Sequelize.InferCreationAttributes<UserInvestmentSettings>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare planId?: number; // null means applies to all plans
  declare customReturnRate?: number;
  declare signalRangeMin?: number;
  declare signalRangeMax?: number;
  declare canInvest: boolean;
  declare maxInvestmentAmount?: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof UserInvestmentSettings {
    return UserInvestmentSettings.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          field: "user_id",
        },

        planId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "investment_plans",
            key: "id",
          },
          field: "plan_id",
          comment: "null means applies to all plans",
        },

        customReturnRate: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
          field: "custom_return_rate",
        },

        signalRangeMin: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: "signal_range_min",
        },

        signalRangeMax: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: "signal_range_max",
        },

        canInvest: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          field: "can_invest",
        },

        maxInvestmentAmount: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: "max_investment_amount",
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
        tableName: "user_investment_settings",
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
            name: "user_plan_unique",
            unique: true,
            using: "BTREE",
            fields: [{ name: "user_id" }, { name: "plan_id" }],
          },
        ],
      }
    );
  }

  // UserInvestmentSettings belongsTo Users
  declare user: Sequelize.NonAttribute<Users>;
  declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;

  // UserInvestmentSettings belongsTo InvestmentPlans
  declare plan: Sequelize.NonAttribute<InvestmentPlans>;
  declare getPlan: Sequelize.BelongsToGetAssociationMixin<InvestmentPlans>;
}
