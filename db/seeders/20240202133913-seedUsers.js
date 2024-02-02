'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "biba",
          email: 'qq@q',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "boba",
          email: 'qq@w',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
