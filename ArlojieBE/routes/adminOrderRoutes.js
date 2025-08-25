// routes/adminOrderRoutes.js
const express = require('express');
const router = express.Router();

const adminOrderController = require('../controllers/adminOrderController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Lihat semua order
router.get('/orders', verifyToken, isAdmin, adminOrderController.getAllOrders);

// Update status order
router.put('/orders/:id/status', verifyToken, isAdmin, adminOrderController.updateOrderStatus);

// Lihat detail order
router.get('/orders/:id', verifyToken, isAdmin, adminOrderController.getOrderDetail);

module.exports = router;
