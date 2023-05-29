/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Locations', [
      {
        id: 'location-01',
        rental_company_id: 'rental_company-01',
        name: 'Location A',
        address: 'Your Location',
      },
      {
        id: 'location-02',
        rental_company_id: 'rental_company-03',
        name: 'Location B',
        address: 'Your Location',
      },
      {
        id: 'location-03',
        rental_company_id: 'rental_company-03',
        name: 'Location C',
        address: 'Your Location',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {});
  },
};
