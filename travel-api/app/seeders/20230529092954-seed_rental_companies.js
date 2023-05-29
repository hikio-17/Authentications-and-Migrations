/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RentalCompanies', [
      {
        id: 'rental_company-01',
        name: 'Rental Company A',
        address: 'Jalan Depan',
        telephone: '0822-xxxx-xxxx',
      },
      {
        id: 'rental_company-02',
        name: 'Rental Company B',
        address: 'Jalan Samping',
        telephone: '0822-xxxx-xxxx',
      },
      {
        id: 'rental_company-03',
        name: 'Rental Company C',
        address: 'Jalan Belakang',
        telephone: '0822-xxxx-xxxx',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RentalCompanies', null, {});
  },
};
