"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("wallets", {
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      name: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      shortName: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'short_name'
      },

      walletAddress: {
         type: DataTypes.TEXT,
         allowNull: true,
         field: 'wallet_address'
      },

      network: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
         field: 'created_at'
      },

      updatedAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'updated_at'
      },

      walletBalanceId: {
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: true,
         field: 'wallet_balance_id'
      },

      transactionsId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'transactions_id'
      },

      type: {
         type: DataTypes.ENUM('crypto','stock','share'),
         allowNull: false
      },

      icon: {
         type: DataTypes.TEXT,
         allowNull: true
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("wallets", { transaction: t }),
         ]);
      }
   )},
}