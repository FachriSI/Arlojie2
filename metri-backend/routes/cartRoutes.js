const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require = require('../middlewares/authMiddleware');

router.post('/cart/add', authMiddleware, cartController.addToCart);
router.get('/cart', authMiddleware, cartController.getCart);
router.put('/cart/update/:id', authMiddleware, cartController.updateCart);
router.delete('/cart/remove/:id', authMiddleware, cartController.removeFromCart);

module.exports = router;