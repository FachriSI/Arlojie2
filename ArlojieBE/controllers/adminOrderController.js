const Order = require('../models/orders');
const OrderItem = require('../models/order_items');
const User = require('../models/users');
const Product = require('../models/products');

exports.getAllOrders = async (req, res) => {
  try {
    const status = req.query.status; // opsional, filter by status
    let where = {};
    if (status) where.status = status;

    const orders = await Order.findAll({
      where,
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: OrderItem, include: [Product] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });

    order.status = status;
    await order.save();

    res.json({ message: 'Status order diperbarui', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: OrderItem, include: [Product] }
      ]
    });

    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
