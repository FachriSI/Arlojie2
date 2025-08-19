   const express = require('express');
    const router = express.Router();
    const orderController = require('../controllers/orderController');
    const authMiddleware = require('../middlewares/authMiddleware'); 

    // Contoh rute yang benar
    router.post('/orders/place', authMiddleware, orderController.placeOrder);
    router.get('/orders/history', authMiddleware, orderController.getOrderHistory);

    module.exports = router;
    