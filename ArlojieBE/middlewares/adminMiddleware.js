// middlewares/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki hak akses sebagai admin.' });
  }
};

module.exports = adminMiddleware;
