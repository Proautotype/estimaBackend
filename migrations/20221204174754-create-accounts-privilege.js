'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accountsPrivileges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        references: {
          key: "id",
          model: "UserAccounts"
        },
        type: Sequelize.UUID,
        onDelete: "NO ACTION"
      },
      privilegeId: {
        references: {
          key: "id",
          model: "privileges"
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
    await queryInterface.dropTable('accountsPrivileges');
  }
};