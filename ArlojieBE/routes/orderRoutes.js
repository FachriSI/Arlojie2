const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// Perbaiki impor middleware: ambil 'verifyToken' secara spesifik
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, orderController.createOrder);
router.get('/', verifyToken, orderController.getUserOrders);
router.get('/:id', verifyToken, orderController.getOrderDetails);

module.exports = router;