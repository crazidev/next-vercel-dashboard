"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("wallet_balances", {
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true
      },

      userId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'user_id'
      },

      walletId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'wallet_id'
      },

      balance: {
         type: DataTypes.INTEGER,
         allowNull: true
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

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("wallet_balances", { transaction: t }),
         ]);
      }
   )},
}