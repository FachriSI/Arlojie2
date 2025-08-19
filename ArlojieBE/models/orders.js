const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Hapus import OrderItem
const User = require('./users');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  order_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM('pending', 'paid', 'packed', 'shipped', 'delivered', 'cancelled'), defaultValue: 'pending' },
  shipping_name: { type: DataTypes.STRING, allowNull: false },
  shipping_address: { type: DataTypes.TEXT, allowNull: false },
  shipping_phone: { type: DataTypes.STRING, allowNull: false },
  shipping_city: { type: DataTypes.STRING, allowNull: false },
  shipping_postal_code: { type: DataTypes.STRING, allowNull: false },
  shipping_method: { type: DataTypes.ENUM('JNE', 'Tiki', 'SiCepat'), allowNull: false },
  total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  payment_method: { type: DataTypes.ENUM('TRANSFER BANK', 'E-WALLET', 'COD'), allowNull: false },
}, {
  timestamps: true,
  tableName: 'orders'
});

module.exports = Order;