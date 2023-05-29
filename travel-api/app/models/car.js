const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // define association here
      Car.hasMany(models.RentalTransaction, {
        foreignKey: 'car_id',
      });

      Car.belongsTo(models.RentalCompany, {
        foreignKey: 'rental_company_id',
        onDelete: 'CASCADE',
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rental_company_id: {
      type: DataTypes.STRING,
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