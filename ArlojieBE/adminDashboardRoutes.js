const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const adminDashboardController = require('../controllers/adminDashboardController');

router.get('/dashboard', verifyToken, isAdmin, adminDashboardController.getDashboardData);

module.exports = router;
