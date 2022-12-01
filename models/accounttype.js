'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccountType.hasMany(models.UserAccount,{
        foreignKey:"accountTypeId",
        onDelete: "NO ACTION"
      })
    }
  }
  AccountType.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccountType',
  });
  return AccountType;
};