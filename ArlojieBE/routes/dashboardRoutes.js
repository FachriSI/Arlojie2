const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Ini data dashboard, hanya bisa diakses jika login!' });
});

module.exports = router;