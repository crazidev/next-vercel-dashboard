"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.update("transactions", "amount", {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.update("transactions", "amount", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
