const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Renting_History = sequelize.define('RentingHistory', {
    email: Sequelize.DataTypes.STRING,
    rent_date: Sequelize.DataTypes.DATE,
    bond_amount: Sequelize.DataTypes.DECIMAL,
    totalPrice: Sequelize.DataTypes.DECIMAL,
  });

  return Renting_History;
};
