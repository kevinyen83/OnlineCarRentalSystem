'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RentingHistory.init({
    email: DataTypes.STRING,
    rent_date: DataTypes.DATE,
    bond_amount: DataTypes.DECIMAL,
    totalPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'RentingHistory',
  });
  return RentingHistory;
};