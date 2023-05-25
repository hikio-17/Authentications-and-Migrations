const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_roles.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      user_roles.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
    }
  }
  user_roles.init({
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'user_roles',
  });
  return user_roles;
};