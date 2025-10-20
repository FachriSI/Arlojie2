const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ROUTES
router.get("/", productController.getAllProducts); // Ambil semua produk
router.get("/:id", productController.getProductById); // Ambil produk berdasarkan ID
router.post("/", upload.array("images", 3), productController.createProduct); // Tambah produkrouter.get("/:id", productController.getProductById);
router.put("/:id", upload.array("images", 3), productController.updateProduct);
router.delete("/:id", productController.deleteProduct); // Hapus produk

module.exports = router;
