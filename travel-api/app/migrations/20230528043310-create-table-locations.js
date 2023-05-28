/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locations', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      rental_company_id: {
        type: Sequelize.STRING,
        references: {
          model: 'RentalCompanies',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Locations');
  },
};