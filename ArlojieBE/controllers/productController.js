const Product = require('../models/products');

// Buat produk baru
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, status } = req.body;
    const images = req.files?.map(file => `/uploads/products/${file.filename}`) || [];

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      status: status ? status.toLowerCase() : 'nonaktif',
      images
    });

    res.status(201).json({ message: 'Produk berhasil ditambahkan!', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Gagal membuat produk.', error: error.message });
  }
};

// Ambil semua produk
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data produk.', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
        });

        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Gagal mengambil data produk.', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, status } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    let images = [];

    if (req.files && req.files.length > 0) {
      // ada upload baru
      images = req.files.map((file) => `/uploads/products/${file.filename}`);
    } else if (req.body.oldImages) {
      // tidak ada upload baru → pakai gambar lama
      images = JSON.parse(req.body.oldImages);
    }

    await product.update({
      name,
      description,
      price,
      category,
      stock,
      status,
      images,
    });

    res.status(200).json({ message: "Produk berhasil diupdate", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Gagal update produk", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Produk berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus produk.', error: error.message });
  }
};
