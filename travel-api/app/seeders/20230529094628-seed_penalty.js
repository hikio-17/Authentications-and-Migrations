/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Penalties', [
      {
        id: 'penalty-01',
        rental_price_id: 'rental_price-01',
        penalty_amount: 150000,
      },
      {
        id: 'penalty-02',
        rental_price_id: 'rental_price-02',
        penalty_amount: 100000,
      },
      {
        id: 'penalty-03',
        rental_price_id: 'rental_price-03',
        penalty_amount: 110000,
      },
      {
        id: 'penalty-04',
        rental_price_id: 'rental_price-04',
        penalty_amount: 90000,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Penalties', null, {});
  },
};
