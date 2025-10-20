const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users'); // Impor model User
const Product = require('./products'); // Impor model Product

const CartItem = sequelize.define("CartItem", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  },
}, {
  timestamps: true,
  tableName: 'cart_items',
});

module.exports = CartItem;
