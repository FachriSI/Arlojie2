const express = require('express');
const router = express.Router();
// Perbaiki impor middleware: ambil 'verifyToken' secara spesifik
const { verifyToken } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

// Catatan: Asumsi file utama server (index.js) menggunakan:
// app.use('/api/cart', cartRoutes);
// Maka, rute-rute di sini tidak perlu diawali dengan '/cart' lagi.

// Rute untuk menambahkan item ke keranjang (POST /api/cart/add)
router.post('/add', verifyToken, cartController.addToCart);

// Rute untuk mendapatkan isi keranjang (GET /api/cart)
router.get('/', verifyToken, cartController.getCart);

// Rute untuk memperbarui kuantitas item di keranjang (PUT /api/cart/update/:id)
router.put('/update/:id', verifyToken, cartController.updateCart);

// Rute untuk menghapus item dari keranjang (DELETE /api/cart/remove/:id)
router.delete('/remove/:id', verifyToken, cartController.removeFromCart);

module.exports = router;