"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "user_investments",
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
          { transaction: t }
        ),
      ]);
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("user_investments", { transaction: t }),
      ]);
    });
  },
};
