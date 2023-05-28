/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
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
      type: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.DATEONLY,
      },
      status: {
        type: Sequelize.ENUM('AVAILABLE', 'RENTED', 'UNAVAILABLE'),
        defaultValue: 'AVAILABLE',
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
    await queryInterface.dropTable('Cars');
  },
};