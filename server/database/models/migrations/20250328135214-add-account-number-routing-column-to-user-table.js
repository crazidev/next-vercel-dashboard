"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "account_number", {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "account_number",
    });
    await queryInterface.addColumn("users", "routing_number", {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "routing_number",
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("users", "account_number");
    queryInterface.removeColumn("users", "routing_number");
  },
};
