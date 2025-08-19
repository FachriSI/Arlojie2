const Order = require('../models/orders');
const OrderItem = require('../models/order_items');
const CartItem = require('../models/cart_items');
const Product = require('../models/products');
const sequelize = require('../config/database');

exports.placeOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const user_id = req.user.id;
    const {
      shipping_name,
      shipping_address,
      shipping_phone,
      shipping_city,
      shipping_postal_code,
      shipping_method,
      payment_method
    } = req.body;

    // Ambil item dari keranjang beserta data produk
    const cartItems = await CartItem.findAll({
      where: { user_id },
      include: [{ model: Product }],
      transaction: t
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Keranjang belanja kosong' });
    }

    // Hitung total harga
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.Product.price * item.quantity,
      0
    );

    // Buat pesanan baru
    const order = await Order.create(
      {
        user_id,
        total_price: totalPrice,
        shipping_name,
        shipping_address,
        shipping_phone,
        shipping_city,
        shipping_postal_code,
        shipping_method,
        payment_method
      },
      { transaction: t }
    );

    // Pindahkan item dari cart ke order_items
    await Promise.all(
      cartItems.map(async (item) => {
        if (item.Product.stock < item.quantity) {
          throw new Error(
            `Stok untuk produk ${item.Product.name} tidak mencukupi.`
          );
        }

        await OrderItem.create(
          {
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.Product.price
          },
          { transaction: t }
        );

        // Kurangi stok produk
        await Product.decrement('stock', {
          by: item.quantity,
          where: { id: item.product_id },
          transaction: t
        });
      })
    );

    // Hapus item dari keranjang
    await CartItem.destroy({ where: { user_id } }, { transaction: t });

    await t.commit();
    res
      .status(201)
      .json({ message: 'Pesanan berhasil dibuat!', orderId: order.id });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const user_id = req.user.id;
    const orders = await Order.findAll({ where: { user_id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
