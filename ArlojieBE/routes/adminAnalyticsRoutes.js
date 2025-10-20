const express = require('express');
const router = express.Router();
const adminAnalyticsController = require('../controllers/adminAnalyticsController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/analytics', verifyToken, isAdmin, adminAnalyticsController.getAnalytics);

module.exports = router;
