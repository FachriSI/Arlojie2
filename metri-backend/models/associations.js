const User = require('./users');
const Product = require('./products');
const Order = require('./orders');
const OrderItem = require('./order_items');
const CartItem = require('./cart_items');

// Definisikan semua relasi di sini
// Relasi User
User.hasMany(Order, { foreignKey: 'user_id' });
User.hasMany(CartItem, { foreignKey: 'user_id' });

// Relasi Product
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

// Relasi Order
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });

// Relasi OrderItem
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Relasi CartItem
CartItem.belongsTo(User, { foreignKey: 'user_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// Relasi tidak harus diekspor