const express = require('express');
const router = express.Router();
const { register, login, resetPassword } = require('../controllers/authController');
// Import fungsi 'verifyToken' secara spesifik dari authMiddleware
const { verifyToken } = require('../middlewares/authMiddleware'); // <-- PERUBAHAN DI SINI

// Rute '/protected' sekarang menggunakan middleware 'verifyToken'
router.get('/protected', verifyToken, (req, res) => { // <-- PERUBAHAN DI SINI
  res.json({ message: 'Ini route yang hanya bisa diakses jika sudah login!', user: req.user });
});

router.post('/register', register);
router.post('/login', login);
router.post("/reset-password", resetPassword);

module.exports = router;