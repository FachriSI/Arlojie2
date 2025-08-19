const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route untuk membuat pesanan baru
router.post('/orders/place', authMiddleware, orderController.placeOrder);

// Route untuk melihat riwayat pesanan user
router.get('/orders/history', authMiddleware, orderController.getOrderHistory);

module.exports = router;
