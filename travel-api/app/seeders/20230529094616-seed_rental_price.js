/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RentalPrices', [
      {
        id: 'rental_price-01',
        car_id: 'car-01',
        rental_price: 1500000,
      },
      {
        id: 'rental_price-02',
        car_id: 'car-02',
        rental_price: 100000,
      },
      {
        id: 'rental_price-03',
        car_id: 'car-03',
        rental_price: 1100000,
      },
      {
        id: 'rental_price-04',
        car_id: 'car-04',
        rental_price: 900000,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RentalPrices', null, {});
  },
};
