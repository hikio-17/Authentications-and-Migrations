const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // define association here
      Status.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'user',
      });
    }
  }
  Status.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    user_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};