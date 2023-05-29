/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cars', [
      {
        id: 'car-01',
        rental_company_id: 'rental_company-01',
        name: 'Mitsubishi Pajero Sport',
        type: 'SUV',
        year: '2015',
        status: 'AVAILABLE',
      },
      {
        id: 'car-02',
        rental_company_id: 'rental_company-01',
        name: 'Honda Jazz',
        type: 'RS',
        year: '2022',
        status: 'AVAILABLE',
      },
      {
        id: 'car-03',
        rental_company_id: 'rental_company-02',
        name: 'Honda Jazz',
        type: 'S',
        year: '2023',
        status: 'AVAILABLE',
      },
      {
        id: 'car-04',
        rental_company_id: 'rental_company-03',
        name: 'Honda Jazz',
        type: 'S',
        year: '2023',
        status: 'AVAILABLE',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  },
};
