const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.RentalTransaction, {
        foreignKey: 'car_id',
      });

      Car.belongsTo(models.RentalCompany, {
        foreignKey: 'rental_company_id',
      });

      Car.hasMany(models.RentalPrice, {
        foreignKey: 'car_id',
      });
    }
  }
  Car.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    rental_company_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('AVAILABLE', 'RENTED', 'UNVAILABLE'),
      default: 'AVAILABLE',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};