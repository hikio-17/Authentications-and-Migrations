const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RentalPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RentalPrice.belongsTo(models.Car, {
        foreignKey: 'car_id',
      });

      RentalPrice.hasMany(models.Penalty, {
        foreignKey: 'rental_price_id',
      });
    }
  }
  RentalPrice.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rental_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RentalPrice',
  });
  return RentalPrice;
};