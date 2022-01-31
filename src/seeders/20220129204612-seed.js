'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Participants', [
      {
        name: 'Alice',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    await queryInterface.bulkInsert('Meetings', [
      {
        description: 'Test meeting',
        url: 'https://www.google.com/',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Meetings')
    await queryInterface.bulkDelete('Participants')
  }
};
