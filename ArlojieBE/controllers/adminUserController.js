const User = require('../models/users');
const Product = require('../models/products');
const Order = require('../models/orders');

// Ambil semua user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'status']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'role', 'status']
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ubah status user (aktif/nonaktif)
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // misal status user = aktif/nonaktif
    user.status = user.status === 'active' ? 'inactive' : 'active';
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