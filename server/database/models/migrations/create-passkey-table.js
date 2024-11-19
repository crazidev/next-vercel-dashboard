"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("passkey", {
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

      credential: {
         type: DataTypes.TEXT,
         allowNull: false
      },

      device: {
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
            queryInterface.dropTable("passkey", { transaction: t }),
         ]);
      }
   )},
}