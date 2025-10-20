const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Categories = sequelize.define('Categories', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  }
});
module.exports = Categories;