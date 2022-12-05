'use strict';

// const { DataTypes } = require('sequelize/types');
require("uuid").v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAccounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUID,
        type: Sequelize.UUID
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      accountName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      pin:{
        type:Sequelize.STRING
      },
      accountTypeId: {
        references:{
          key: "id",
          model: "AccountTypes"
        },
        type: Sequelize.INTEGER,
        onDelete: "NO ACTION"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserAccounts');
  }
};