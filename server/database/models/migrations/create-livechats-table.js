"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("livechats", {
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true
      },

      fromAdmin: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         field: 'from_admin'
      },

      message: {
         type: DataTypes.STRING(255),
         allowNull: false
      },

      type: {
         type: DataTypes.BLOB,
         allowNull: true
      },

      fileUrl: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'file_url'
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

      sessionId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'session_id'
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("livechats", { transaction: t }),
         ]);
      }
   )},
}