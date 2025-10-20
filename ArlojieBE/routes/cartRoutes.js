const express = require("express");
const router = express.Router();
const CartItem = require("../models/cart_items");
const Product = require("../models/products");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body; 
    const userId = req.user.id;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
    }
    let item = await CartItem.findOne({ where: { userId, productId } });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ userId, productId, quantity });
    }

    res.status(201).json({ success: true, message: 'Item berhasil ditambahkan', item });
  } catch (err) {
    console.error("Error di POST /api/cart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const items = await CartItem.findAll({
      where: { userId: req.user.id }, 
      include: [{ model: Product, as: "product" }],
      order: [['createdAt', 'ASC']],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findByPk(req.params.id);

    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Hapus item dari keranjang
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    await item.destroy();
    res.json({ message: "Item dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
