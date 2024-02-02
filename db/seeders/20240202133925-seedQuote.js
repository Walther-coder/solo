'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Quotes",
      [
        {
          body: 'Дорогу осилит идущий, чай заварит заваривающий.',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'Никогда такого не было, и вот опять...',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'Дают - бери, не дают - отбери!',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'Не важно в какой ты жопе, главное, чтобы никого не было в твоей',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Quotes", null, {});
  }
};
