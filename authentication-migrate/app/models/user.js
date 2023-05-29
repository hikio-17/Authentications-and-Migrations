const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'userId',
        otherKey: 'roleId',
      });

      User.hasMany(models.Status, {
        foreignKey: 'user_id',
        as: 'statuses',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};