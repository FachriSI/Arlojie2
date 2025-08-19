const CartItem = require('../models/cart_items');
const Product = require('../models/products');
const sequelize = require('sequelize'); 

exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;

    // Cek apakah produk sudah ada di keranjang user
    let cartItem = await CartItem.findOne({
      where: { user_id, product_id }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      return res.status(200).json(cartItem);
    } else {
      cartItem = await CartItem.create({ user_id, product_id, quantity });
      return res.status(201).json(cartItem);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const cartItems = await CartItem.findAll({ 
      where: { user_id },
      include: [{ model: Product }] // Ambil data produk juga
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const user_id = req.user.id;

    // Cari item keranjang dan pastikan item tersebut milik user yang sedang login
    const cartItem = await CartItem.findOne({
      where: { id, user_id }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item keranjang tidak ditemukan.' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Kuantitas berhasil diperbarui.', cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // Cari item keranjang dan pastikan item tersebut milik user yang sedang login
    const cartItem = await CartItem.findOne({
      where: { id, user_id }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item keranjang tidak ditemukan.' });
    }

    await cartItem.destroy();

    res.status(200).json({ message: 'Item berhasil dihapus dari keranjang.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};