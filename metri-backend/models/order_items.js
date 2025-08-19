const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Hapus import Order dan Product
const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  timestamps: true,
  tableName: 'order_items'
});
module.exports = OrderItem;