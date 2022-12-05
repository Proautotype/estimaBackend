'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AccountTypes', [
      {
      type: 'individual',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      type: 'company',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AccountTypes', null, {});
  }
};
