const { User, Order, Product } = require('../models/associations');
const { Op } = require('sequelize');

exports.getDashboardData = async (req, res) => {
  try {
    const totalOrder = await Order.count();
    const totalUser = await User.count();
    const totalProduct = await Product.count();

    const totalRevenue = await Order.sum('totalPrice', {
      where: { status: { [Op.not]: 'cancelled' } },
    });

    // ambil 5 user terbaru
    const recentUsers = await User.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['name', 'email', 'createdAt'],
    });

    // ambil 5 produk stok terendah
    const lowStock = await Product.findAll({
      limit: 5,
      order: [['stock', 'ASC']],
      attributes: ['name', 'stock'],
    });

    // ambil 5 order terbaru
    const recentOrders = await Order.findAll({
      limit: 5,
      order: [['orderDate', 'DESC']],
      attributes: ['id', 'namaLengkap', 'orderDate', 'totalPrice', 'status'],
    });

    res.status(200).json({
      summary: {
        totalOrder,
        totalUser,
        totalProduct,
        totalRevenue: totalRevenue || 0,
      },
      recentUsers,
      lowStock,
      recentOrders,
    });
  } catch (error) {
    console.error('Gagal mengambil data dashboard:', error);
    res.status(500).json({ message: 'Gagal memuat data dashboard', error: error.message });
  }
};
