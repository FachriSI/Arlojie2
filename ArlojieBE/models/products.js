const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  category: { 
    type: DataTypes.ENUM('Jam Tangan Pria', 'Jam Tangan Wanita', 'Jam Tangan Anak-anak'), 
    allowNull: false 
  },
  status: { type: DataTypes.ENUM('aktif', 'nonaktif'), defaultValue: 'aktif' },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isArrayOfImages(value) {
        if (!Array.isArray(value) || value.length < 3) {
          throw new Error('Minimal harus upload 3 foto produk');
        }
      }
    }
  }
}, {
  timestamps: true,
  tableName: 'products',
});

module.exports = Product;
