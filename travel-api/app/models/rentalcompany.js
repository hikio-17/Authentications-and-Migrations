const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RentalCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RentalCompany.hasMany(models.Car, {
        foreignKey: 'rental_company_id',
      });

      RentalCompany.hasMany(models.Location, {
        foreignKey: 'rental_company_id',
      });
    }
  }
  RentalCompany.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RentalCompany',
  });
  return RentalCompany;
};