const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  order_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  status: { 
    type: DataTypes.ENUM('pending', 'paid', 'packed', 'shipped', 'delivered', 'cancelled'), 
    defaultValue: 'pending' // Pastikan ini lowercase
  },
  shipping_name: { type: DataTypes.STRING, allowNull: false },
  shipping_address: { type: DataTypes.TEXT, allowNull: false },
  shipping_phone: { type: DataTypes.STRING, allowNull: false },
  shipping_city: { type: DataTypes.STRING, allowNull: false },
  shipping_postal_code: { type: DataTypes.STRING, allowNull: true }, // <-- Ubah menjadi allowNull: true
  shipping_method: { 
    type: DataTypes.ENUM('JNE', 'TIKI', 'SiCepat'), // <-- Sesuaikan dengan label di frontend
    allowNull: false 
  },
  total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  payment_method: { 
    type: DataTypes.ENUM('bca', 'bni', 'mandiri', 'gopay', 'ovo', 'dana', 'cod'), // <-- Sesuaikan dengan value di frontend
    allowNull: false 
  },
}, {
  timestamps: true,
  tableName: 'orders',
});

module.exports = Order;