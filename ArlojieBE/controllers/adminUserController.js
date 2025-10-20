const User = require('../models/users');
const Product = require('../models/products');
const Order = require('../models/orders');
const { Sequelize } = require('sequelize');

const getAllUsers = async (req, res) => {
    try {
        // Query ini hanya mengambil semua data dari tabel 'users'
        const users = await User.findAll({
          attributes: ['id', 'name', 'email', 'role', 'status', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        console.error("ERROR in getAllUsers:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

const getUserById = async (req, res) => {
  try {
  const user = await User.findByPk(req.params.id, {
    attributes: ['id', 'name', 'email', 'role', 'status', 'createdAt'] 
});
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    user.status = user.status === 'active' ? 'blocked' : 'active';
    await user.save();

    res.json({ message: 'Status user diperbarui', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.count();
    const productCount = await Product.count();
    const orderCount = await Order.count();
    res.json({ userCount, productCount, orderCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  toggleUserStatus,
  getDashboardStats
};