/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RentalPrices', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      car_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Cars',
          key: 'id',
        },
      },
      rental_price: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('RentalPrices');
  },
};