"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("livechat_session", {
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      userId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         field: 'user_id'
      },

      customerName: {
         type: DataTypes.TEXT,
         allowNull: true,
         field: 'customer_name'
      },

      customerEmail: {
         type: DataTypes.TEXT,
         allowNull: true,
         field: 'customer_email'
      },

      createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: Sequelize.Sequelize.fn('current_timestamp')
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("livechat_session", { transaction: t }),
         ]);
      }
   )},
}