/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RentalTransactions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      car_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Cars',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      rental_date: {
        type: Sequelize.DATEONLY,
      },
      return_date: {
        type: Sequelize.DATEONLY,
      },
      destination_address: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('RentalTransactions');
  },
};