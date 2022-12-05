'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accountsPrivilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accountsPrivilege.hasMany(
        models.privileges,{
          foreignKey:"privilegeId",
          onDelete:"NO ACTION",
          onUpdate:"CASCADE"
        }
      )
      accountsPrivilege.hasMany(
        models.UserAccount,{
        foreignKey:"useraccountid",
        onDelete:"NO ACTION",
        onUpdate:"CASCADE"
      })
    }
  }
  accountsPrivilege.init({
    
  }, {
    sequelize,
    modelName: 'accountsPrivilege',
  });
  return accountsPrivilege;
};