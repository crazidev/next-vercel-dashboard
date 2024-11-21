"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("alert", {
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      userId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'user_id'
      },

      type: {
         type: DataTypes.ENUM('warning','error','info'),
         allowNull: false,
         defaultValue: "info"
      },

      title: {
         type: DataTypes.STRING(100),
         allowNull: false
      },

      message: {
         type: DataTypes.TEXT,
         allowNull: false
      },

      startAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: Sequelize.Sequelize.fn('current_timestamp')
      },

      endAt: {
         type: DataTypes.DATE,
         allowNull: true
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("alert", { transaction: t }),
         ]);
      }
   )},
}