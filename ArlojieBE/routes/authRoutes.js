const express = require('express');
const router = express.Router();
const { register, login, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Ini route yang hanya bisa diakses jika sudah login!', user: req.user });
});

router.post('/register', register);
router.post('/login', login);
router.post("/reset-password", resetPassword);

module.exports = router;


