"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("versions", {
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      version: {
         type: DataTypes.TEXT,
         allowNull: true
      },

      status: {
         type: DataTypes.ENUM('active','inactive'),
         allowNull: true,
         defaultValue: "active"
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("versions", { transaction: t }),
         ]);
      }
   )},
}