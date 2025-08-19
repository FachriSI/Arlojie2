const Product = require('../models/products');

exports.createProduct = async (req, res) => {
  console.log("BODY DITERIMA:", req.body);
  console.log("FILES DITERIMA:", req.files); 

  try {
    // Ambil data dari body, serta path file yang disediakan oleh Multer
    const { name, price, description, stock, category, status } = req.body;
    
    // Periksa apakah ada file yang diunggah dan jumlahnya sesuai
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Minimal harus mengunggah 3 foto produk.' });
    }
    
    // Ekstrak path dari file yang diunggah dan simpan dalam array
    const imageUrls = req.files.map(file => file.path);

    const product = await Product.create({
      name,
      price,
      description,
      stock,
      category,
      status,
      images: imageUrls, // Simpan array path ke kolom `images`
    });
    
    res.status(201).json({ message: 'Produk berhasil ditambahkan', product });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambah produk', error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil produk', error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil produk', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, image } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    await product.update({ name, price, description, stock, image });
    res.json({ message: 'Produk berhasil diupdate', product });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update produk', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    await product.destroy();
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus produk', error: err.message });
  }
};