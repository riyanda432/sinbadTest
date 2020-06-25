'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    cust_id: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    
  }, {});
  Customers.associate = function(models) {
    // associations can be defined here

  };
  return Customers;
};