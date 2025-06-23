"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "investment_plans",
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
          { transaction: t }
        ),
      ]);
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("investment_plans", { transaction: t }),
      ]);
    });
  },
};
