"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "user_investment_settings",
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
          { transaction: t }
        ),
      ]);
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("user_investment_settings", {
          transaction: t,
        }),
      ]);
    });
  },
};
