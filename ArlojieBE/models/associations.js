// models/associations.js

const User = require('./users'); // Pastikan path ini benar ke file model User Anda
const Product = require('./products'); // Pastikan path ini benar ke file model Product Anda
const Order = require('./orders'); // Pastikan path ini benar ke file model Order Anda
const OrderItem = require('./order_items'); // Pastikan path ini benar ke file model OrderItem Anda
const CartItem = require('./cart_items'); // Pastikan path ini benar ke file model CartItem Anda

// Relasi User
User.hasMany(Order, { foreignKey: 'user_id' });
User.hasMany(CartItem, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Relasi Product
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// Relasi Order
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Tambahan: Pastikan model-model lain juga memiliki relasi yang sesuai
// Misalnya, jika OrderItem memiliki harga saat itu:
// OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Ekspor semua model agar bisa diakses di tempat lain jika diperlukan
module.exports = { User, Product, Order, OrderItem, CartItem };