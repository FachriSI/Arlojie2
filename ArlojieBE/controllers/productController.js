const Product = require('../models/products');

// Fungsi untuk membuat produk baru
exports.createProduct = async (req, res) => {
    try {
       const { name, description, price, category, stock, status } = req.body;
       const images = req.files.map(file => `/uploads/products/${file.filename}`);

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
           status: status ? status.toLowerCase() : 'nonaktif',
           images: JSON.stringify(images),
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

// Fungsi untuk mendapatkan semua produk
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data produk.', error: error.message });
    }
};

// Fungsi untuk menghapus produk
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