"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
         queryInterface.addConstraint("alert", {
            fields: ["user_id"],
            name: "alert(user_id)-users(id)_fk",
            type: "foreign key",
            references: {
               table: "users",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("livechats", {
            fields: ["session_id"],
            name: "livechats(session_id)-livechat_session(id)_fk",
            type: "foreign key",
            references: {
               table: "livechat_session",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("transactions", {
            fields: ["user_id"],
            name: "transactions(user_id)-users(id)_fk",
            type: "foreign key",
            references: {
               table: "users",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("transactions", {
            fields: ["wallet_id"],
            name: "transactions(wallet_id)-wallets(id)_fk",
            type: "foreign key",
            references: {
               table: "wallets",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("transactions", {
            fields: ["beneficiary_id"],
            name: "transactions(beneficiary_id)-users(id)_fk",
            type: "foreign key",
            references: {
               table: "users",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("transactions", {
            fields: ["bank_id"],
            name: "transactions(bank_id)-banks(id)_fk",
            type: "foreign key",
            references: {
               table: "banks",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("verification_tokens", {
            fields: ["user_id"],
            name: "verification_tokens(user_id)-users(id)_fk",
            type: "foreign key",
            references: {
               table: "users",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("wallet_balances", {
            fields: ["user_id"],
            name: "wallet_balances(user_id)-users(id)_fk",
            type: "foreign key",
            references: {
               table: "users",
               field: "id"
            },
            transaction: t
         }),

         queryInterface.addConstraint("wallet_balances", {
            fields: ["wallet_id"],
            name: "wallet_balances(wallet_id)-wallets(id)_fk",
            type: "foreign key",
            references: {
               table: "wallets",
               field: "id"
            },
            transaction: t
         }),

         ]);
      });
   },

   down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction(t => {
         return Promise.all([
         queryInterface.removeConstraint("alert", "alert(user_id)-users(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("livechats", "livechats(session_id)-livechat_session(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("transactions", "transactions(user_id)-users(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("transactions", "transactions(wallet_id)-wallets(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("transactions", "transactions(beneficiary_id)-users(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("transactions", "transactions(bank_id)-banks(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("verification_tokens", "verification_tokens(user_id)-users(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("wallet_balances", "wallet_balances(user_id)-users(id)_fk", { transaction: t }),
         queryInterface.removeConstraint("wallet_balances", "wallet_balances(wallet_id)-wallets(id)_fk", { transaction: t }),
         ]);
      });
   }
};
