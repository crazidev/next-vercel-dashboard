"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("transactions", {
      amount: {
         type: DataTypes.INTEGER,
         allowNull: false
      },

      status: {
         type: DataTypes.ENUM('pending','completed'),
         allowNull: true
      },

      paymentMethod: {
         type: DataTypes.ENUM('bank_transfer','crypto','inter_transfer'),
         allowNull: false,
         field: 'payment_method'
      },

      narration: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      reference: {
         type: DataTypes.CHAR(36),
         allowNull: true
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

      walletNetwork: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'wallet_network'
      },

      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      beneficiaryId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'beneficiary_id'
      },

      beneficiaryName: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'beneficiary_name'
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

      bankId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'bank_id'
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("transactions", { transaction: t }),
         ]);
      }
   )},
}