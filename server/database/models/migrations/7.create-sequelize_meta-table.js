"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("SequelizeMeta", {
      name: {
         type: DataTypes.STRING(255),
         allowNull: false,
         primaryKey: true
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("SequelizeMeta", { transaction: t }),
         ]);
      }
   )},
}