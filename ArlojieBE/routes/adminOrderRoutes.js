const express = require('express');
const router = express.Router();
const adminOrderController = require('../controllers/adminOrderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Lihat semua order (opsional filter by status)
router.get('/orders', authMiddleware, adminMiddleware, adminOrderController.getAllOrders);

// Update status order
router.put('/orders/:id/status', authMiddleware, adminMiddleware, adminOrderController.updateOrderStatus);

// Lihat detail order
router.get('/orders/:id', authMiddleware, adminMiddleware, adminOrderController.getOrderDetail);

module.exports = router;
