import * as Sequelize from "sequelize";
import { DataTypes, Model, CreationOptional } from "sequelize";
import { Users } from "./init-models";
import { InvestmentPlans } from "./investment_plans";

export class UserInvestments extends Model<
  Sequelize.InferAttributes<UserInvestments>,
  Sequelize.InferCreationAttributes<UserInvestments>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare planId: number;
  declare amount: number;
  declare expectedReturn: number;
  declare currentReturn: number;
  declare status: "active" | "completed" | "cancelled";
  declare startDate: Date;
  declare endDate: Date;
  declare lastProfitUpdate?: Date;
  declare customReturnRate?: number; // admin override
  declare reference: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserInvestments {
    return UserInvestments.init(
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
          allowNull: false,
          references: {
            model: "investment_plans",
            key: "id",
          },
          field: "plan_id",
        },

        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        expectedReturn: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "expected_return",
        },

        currentReturn: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          field: "current_return",
        },

        status: {
          type: DataTypes.ENUM("active", "completed", "cancelled"),
          allowNull: false,
          defaultValue: "active",
        },

        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "start_date",
        },

        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "end_date",
        },

        lastProfitUpdate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "last_profit_update",
        },

        customReturnRate: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
          field: "custom_return_rate",
          comment: "Admin override for return rate",
        },

        reference: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
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
        tableName: "user_investments",
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
            name: "user_id_status_index",
            using: "BTREE",
            fields: [{ name: "user_id" }, { name: "status" }],
          },
          {
            name: "reference_unique",
            unique: true,
            using: "BTREE",
            fields: [{ name: "reference" }],
          },
        ],
      }
    );
  }

  // UserInvestments belongsTo Users
  declare user: Sequelize.NonAttribute<Users>;
  declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
  declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;

  // UserInvestments belongsTo InvestmentPlans
  declare plan: Sequelize.NonAttribute<InvestmentPlans>;
  declare getPlan: Sequelize.BelongsToGetAssociationMixin<InvestmentPlans>;
  declare setPlan: Sequelize.BelongsToSetAssociationMixin<
    InvestmentPlans,
    number
  >;
}
