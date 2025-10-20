const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },

  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },

  orderDate: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW 
  },

  status: { 
    type: DataTypes.ENUM('pending', 'paid', 'packed', 'shipped', 'delivered', 'cancelled'), 
    defaultValue: 'pending' 
  },

  // ======== FIELD BARU UNTUK ALAMAT & KONTAK ========
  namaLengkap: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  nomorTelepon: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  provinsi: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  kota: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  kecamatan: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  kelurahan: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  alamatLengkap: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },

  kodePos: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  totalPrice: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false 
  },

  shippingMethod: {
    type: DataTypes.ENUM('JNE', 'Tiki', 'SiCepat'),
    allowNull: false,
  },

  paymentMethod: { 
    type: DataTypes.ENUM('TRANSFER BANK', 'E-WALLET', 'COD'), 
    allowNull: false 
  }

}, {
  timestamps: true,
  tableName: 'orders',
});

module.exports = Order;
