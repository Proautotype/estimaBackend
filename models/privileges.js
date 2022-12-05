'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class privileges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      privileges.belongsTo(models.accountsPrivilege,{
        foreignKey:"accountPrivilegeId",
        onDelete: "CASCADE",
      })
    }
  }
  privileges.init({
    type: DataTypes.STRING,
    numberOfProjects: DataTypes.NUMBER,
    numberOfSprints: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'privileges',
  });
  return privileges;
};