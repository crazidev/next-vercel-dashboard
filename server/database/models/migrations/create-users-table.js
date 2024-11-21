"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.createTable("users", {
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      firstName: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: 'first_name'
      },

      lastName: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: 'last_name'
      },

      email: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      phone: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      emailVerified: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         field: 'email_verified'
      },

      gender: {
         type: DataTypes.ENUM('male','female'),
         allowNull: true
      },

      ssn: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      ssnStatus: {
         type: DataTypes.ENUM('uploaded','verified'),
         allowNull: true,
         field: 'ssn_status'
      },

      idDoc: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'id_doc'
      },

      idDocStatus: {
         type: DataTypes.ENUM('uploaded','verified'),
         allowNull: true,
         field: 'id_doc_status'
      },

      accountBalance: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'account_balance'
      },

      state: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      country: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      address: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      emailToken: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'email_token'
      },

      dateOfBirth: {
         type: DataTypes.DATEONLY,
         allowNull: true,
         field: 'date_of_birth'
      },

      hasDeposited: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         field: 'has_deposited'
      },

      password: {
         type: DataTypes.STRING(255),
         allowNull: false
      },

      idDocType: {
         type: DataTypes.ENUM('national_id','drivers_license','international_passport'),
         allowNull: true,
         field: 'id_doc_type'
      },

      profileImg: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'profile_img'
      },

      pin: {
         type: DataTypes.STRING(255),
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

      accountLevel: {
         type: DataTypes.ENUM('tier1','tier2','tier3'),
         allowNull: true,
         field: 'account_level'
      },

      pushId: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'push_id'
      },

      lastSeen: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'last_seen'
      },

      status: {
         type: DataTypes.ENUM('blocked','active','suspended'),
         allowNull: true,
         defaultValue: "active"
      },

      canTransfer: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: 0,
         field: 'can_transfer'
      },

      isAdmin: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: 0,
         field: 'is_admin'
      },

      googleAuthId: {
         type: DataTypes.TEXT,
         allowNull: true,
         field: 'google_auth_id'
      },

            }, { transaction: t }),
         ]);
      }
   )},
   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
            queryInterface.dropTable("users", { transaction: t }),
         ]);
      }
   )},
}