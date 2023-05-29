/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 'user-02',
        name: 'user_1',
        email: 'user_1@gmail.com',
        address: 'My location',
        telephone: '0822-xxxx-xxx',
        password: await bcrypt.hash('user1', 10),
        role: 'USER',
      },
      {
        id: 'user-01',
        name: 'admin',
        email: 'admin@gmail.com',
        address: 'My location',
        telephone: '0822-xxxx-xxx',
        password: await bcrypt.hash('admin', 10),
        role: 'ADMIN',
      },
      {
        id: 'user-03',
        name: 'user_2',
        email: 'user_2@gmail.com',
        address: 'My location',
        telephone: '0822-xxxx-xxx',
        password: await bcrypt.hash('user2', 10),
        role: 'USER',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
