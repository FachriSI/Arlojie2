const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Semua endpoint di bawah hanya bisa diakses admin
router.post('/products', authMiddleware, upload.array('product_images', 3), productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', authMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);


module.exports = router;