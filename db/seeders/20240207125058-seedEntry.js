'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Entries",
      [
        {
          text: "Сходить на выставку",
          status: false,
          date: '2024-03-01',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Купить билеты и забронировать отель",
          status: false,
          date: '2024-03-02',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
    

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Entries", null, {});
  }
};
