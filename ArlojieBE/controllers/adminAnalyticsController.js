const { Order, OrderItem, Product } = require('../models/associations');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

exports.getAnalytics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 💰 Total penjualan hari ini
    const salesToday = await Order.sum('totalPrice', {
      where: {
        orderDate: { [Op.gte]: today },
        status: { [Op.notIn]: ['cancelled'] },
      },
    });

    // 💰 Total penjualan bulan ini
    const salesThisMonth = await Order.sum('totalPrice', {
      where: {
        orderDate: { [Op.gte]: startOfMonth },
        status: { [Op.notIn]: ['cancelled'] },
      },
    });

    // 🕓 Jumlah order pending
    const pendingOrders = await Order.count({
      where: { status: 'pending' },
    });

    // 📊 Total penjualan per bulan (6 bulan terakhir)
    const monthlySales = await Order.findAll({
      attributes: [
        [sequelize.literal("DATE_FORMAT(orderDate, '%Y-%m')"), 'month'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalSales'],
      ],
      where: {
        orderDate: { [Op.gte]: new Date(new Date().setMonth(today.getMonth() - 5)) },
        status: { [Op.notIn]: ['cancelled'] },
      },
      group: ['month'],
      order: [[sequelize.col('month'), 'ASC']],
    });

    const chartData = monthlySales.map((item) => ({
      bulan: item.get('month'),
      total: parseInt(item.get('totalSales')) || 0,
    }));

    // 🔝 Top produk terlaris
    const topProducts = await OrderItem.findAll({
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold'],
      ],
      include: [
        {
          model: Product,
          attributes: ['name', 'images'],
        },
      ],
      group: ['productId', 'Product.id'],
      order: [[sequelize.col('totalSold'), 'DESC']],
      limit: 5,
    });

    // 🖼️ Format gambar produk
    const formattedTopProducts = topProducts.map((item) => {
      let imageUrl = 'https://placehold.co/100x100';

      if (item.Product?.images) {
        try {
          // Karena di model kamu 'images' bertipe JSON
          const imgs = Array.isArray(item.Product.images)
            ? item.Product.images
            : JSON.parse(item.Product.images || '[]');

          if (imgs.length > 0) {
            // Cek apakah sudah termasuk '/uploads' atau belum
            const path = imgs[0].startsWith('/uploads')
              ? imgs[0]
              : `/uploads/${imgs[0]}`;

            // Gunakan URL lengkap agar bisa diakses frontend
            imageUrl = `http://localhost:3000${path}`;
          }
        } catch (err) {
          console.error('Gagal parsing images:', err);
        }
      }

      return {
        foto: imageUrl,
        nama: item.Product?.name || 'Produk Dihapus',
        terjual: `${item.get('totalSold')}x Terjual`,
      };
    });

    // 🔁 Kirim data ke frontend
    res.status(200).json({
      summary: {
        salesToday: salesToday || 0,
        salesThisMonth: salesThisMonth || 0,
        pendingOrders: pendingOrders || 0,
      },
      chartData,
      topProducts: formattedTopProducts,
    });
  } catch (error) {
    console.error('Gagal mengambil data analytics:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};
