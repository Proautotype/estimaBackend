'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:     
    */
    await queryInterface.bulkInsert('privileges', [
      {
        type: 'basic',
        numberOfProjects: 3,
        numberOfSprints: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'advance',
        numberOfProjects: 10,
        numberOfSprints: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'ultimate',
        numberOfProjects: 30,
        numberOfSprints: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
