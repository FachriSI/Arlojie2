const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Hapus import Product dan User
const CartItem = sequelize.define('CartItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
}, {
  timestamps: true,
  tableName: 'cart_items'
});
module.exports = CartItem;