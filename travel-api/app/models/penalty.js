const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Penalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penalty.belongsTo(models.RentalPrice, {
        foreignKey: 'rental_price_id',
      });
    }
  }
  Penalty.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    rental_price_id: {
      type: DataTypes.STRING,
    },
    penalty_amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Penalty',
  });
  return Penalty;
};