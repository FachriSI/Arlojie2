// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

// Konfigurasi multer (untuk upload foto)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rute untuk mendapatkan semua produk
router.get("/", productController.getAllProducts);

// Rute untuk menambah produk baru
router.post("/", upload.array("images", 3), productController.createProduct);

// Rute untuk menghapus produk
router.delete("/:id", productController.deleteProduct);

module.exports = router;