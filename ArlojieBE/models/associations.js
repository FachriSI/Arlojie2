// models/associations.js

const User = require('./users'); // Pastikan path ini benar ke file model User Anda
const Product = require('./products'); // Pastikan path ini benar ke file model Product Anda
const Order = require('./orders'); // Pastikan path ini benar ke file model Order Anda
const OrderItem = require('./order_items'); // Pastikan path ini benar ke file model OrderItem Anda
const CartItem = require('./cart_items'); // Pastikan path ini benar ke file model CartItem Anda

// Relasi User
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
User.hasMany(CartItem, { foreignKey: 'userId' });

// Relasi Product
Product.hasMany(OrderItem, { foreignKey: 'productId' });
Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });

CartItem.belongsTo(User, { foreignKey: 'userId'});
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Relasi Order
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'User' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Product, Order, OrderItem, CartItem };