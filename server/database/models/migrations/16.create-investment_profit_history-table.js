"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "investment_profit_history",
          {
            id: {
              autoIncrement: true,
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
            },

            investmentId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: "user_investments",
                key: "id",
              },
              field: "investment_id",
            },

            profitAmount: {
              type: DataTypes.INTEGER,
              allowNull: false,
              field: "profit_amount",
            },

            signalValue: {
              type: DataTypes.INTEGER,
              allowNull: false,
              field: "signal_value",
              comment: "Signal percentage at time of profit calculation",
            },

            intervalNumber: {
              type: DataTypes.INTEGER,
              allowNull: false,
              field: "interval_number",
              comment: "5-minute interval number since investment start",
            },

            createdAt: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: Sequelize.NOW,
              field: "created_at",
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
        queryInterface.dropTable("investment_profit_history", {
          transaction: t,
        }),
      ]);
    });
  },
};
