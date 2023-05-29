/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'USER',
      },
      {
        id: 2,
        name: 'ADMIN',
      },
      {
        id: 3,
        name: 'PM',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
