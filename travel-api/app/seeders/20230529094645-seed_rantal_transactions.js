/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RentalTransactions', [
      {
        id: 'transaction-01',
        car_id: 'car-01',
        user_id: 'user-02',
        rental_date: '2023-05-27',
        return_date: '2023-05-30',
        destination_address: 'Bandung',
      },
      {
        id: 'transaction-02',
        car_id: 'car-03',
        user_id: 'user-03',
        rental_date: '2023-05-20',
        return_date: '2023-05-23',
        destination_address: 'Cimahi',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RentalTransactions', null, {});
  },
};
