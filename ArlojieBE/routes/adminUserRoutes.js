const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminUserController');

const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/users/:id', verifyToken, isAdmin, adminController.getUserById);
router.put('/users/:id/status', verifyToken, isAdmin, adminController.toggleUserStatus);

module.exports = router;