'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAccount.belongsTo(models.AccountType,{
        foreignKey: "accountTypeId",
        onDelete: "CASCADE",
      })
      //useraccount
      UserAccount.belongsTo(models.accountsPrivilege,{
        foreignKey:"accountPrivilegeId",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
    }
  }
  UserAccount.init({
    email: DataTypes.STRING,
    accountName: DataTypes.STRING,
    phone: DataTypes.STRING,
    pin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAccounts',
  });
  return UserAccount;
};