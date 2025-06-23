"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        // Investment Plans indexes
        queryInterface.addIndex("investment_plans", {
          fields: ["type", "is_active"],
          name: "investment_plans_type_active_index",
          transaction: t,
        }),
        queryInterface.addIndex("investment_plans", {
          fields: ["wallet_id"],
          name: "investment_plans_wallet_id_index",
          transaction: t,
        }),
        queryInterface.addIndex("investment_plans", {
          fields: ["is_active"],
          name: "investment_plans_is_active_index",
          transaction: t,
        }),

        // User Investments indexes
        queryInterface.addIndex("user_investments", {
          fields: ["user_id", "status"],
          name: "user_investments_user_id_status_index",
          transaction: t,
        }),
        queryInterface.addIndex("user_investments", {
          fields: ["reference"],
          name: "user_investments_reference_unique",
          unique: true,
          transaction: t,
        }),
        queryInterface.addIndex("user_investments", {
          fields: ["status"],
          name: "user_investments_status_index",
          transaction: t,
        }),
        queryInterface.addIndex("user_investments", {
          fields: ["plan_id"],
          name: "user_investments_plan_id_index",
          transaction: t,
        }),
        queryInterface.addIndex("user_investments", {
          fields: ["end_date", "status"],
          name: "user_investments_end_date_status_index",
          transaction: t,
        }),

        // User Investment Settings indexes
        queryInterface.addIndex("user_investment_settings", {
          fields: ["user_id", "plan_id"],
          name: "user_investment_settings_user_plan_unique",
          unique: true,
          transaction: t,
        }),
        queryInterface.addIndex("user_investment_settings", {
          fields: ["user_id"],
          name: "user_investment_settings_user_id_index",
          transaction: t,
        }),
        queryInterface.addIndex("user_investment_settings", {
          fields: ["can_invest"],
          name: "user_investment_settings_can_invest_index",
          transaction: t,
        }),

        // Investment Profit History indexes
        queryInterface.addIndex("investment_profit_history", {
          fields: ["investment_id"],
          name: "investment_profit_history_investment_id_index",
          transaction: t,
        }),
        queryInterface.addIndex("investment_profit_history", {
          fields: ["investment_id", "interval_number"],
          name: "investment_profit_history_investment_interval_index",
          transaction: t,
        }),
        queryInterface.addIndex("investment_profit_history", {
          fields: ["created_at"],
          name: "investment_profit_history_created_at_index",
          transaction: t,
        }),
      ]);
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        // Remove all indexes (they'll be removed when tables are dropped anyway)
      ]);
    });
  },
};
