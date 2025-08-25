const CartItem = require('../models/cart_items');
const Product = require('../models/products'); // Asumsi model Product juga diimpor untuk relasi
const sequelize = require('sequelize'); // Diimpor tapi tidak digunakan, bisa dihapus jika tidak diperlukan

// Pastikan relasi antara CartItem dan Product sudah didefinisikan di file model Anda.
// Contoh di models/cart_items.js:
// CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

/**
 * Menambahkan atau memperbarui item di keranjang pengguna.
 * Jika produk sudah ada, kuantitas akan diperbarui. Jika belum, item baru akan dibuat.
 */
exports.addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.user.id; // Diambil dari token yang diverifikasi oleh middleware

        // Validasi input dasar
        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Product ID dan kuantitas valid harus disediakan.' });
        }

        // Cek apakah produk sudah ada di keranjang user
        let cartItem = await CartItem.findOne({
            where: { user_id, product_id }
        });

        if (cartItem) {
            // Jika item sudah ada, perbarui kuantitas
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Kuantitas item keranjang berhasil diperbarui.', cartItem });
        } else {
            // Jika item belum ada, buat item baru
            cartItem = await CartItem.create({ user_id, product_id, quantity });
            return res.status(201).json({ message: 'Item berhasil ditambahkan ke keranjang.', cartItem });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Gagal menambahkan item ke keranjang.', error: error.message });
    }
};

/**
 * Mengambil semua item di keranjang belanja pengguna yang sedang login.
 */
exports.getCart = async (req, res) => {
    try {
        const user_id = req.user.id; // Diambil dari token
        const cartItems = await CartItem.findAll({
            where: { user_id },
            include: [{ 
                model: Product, // Pastikan relasi didefinisikan dan diimpor di model CartItem
                attributes: ['id', 'name', 'price', 'images'] // Sesuaikan atribut produk yang ingin ditampilkan
            }],
            order: [['createdAt', 'ASC']],
        });
        res.status(200).json({ cartItems });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Gagal memuat keranjang.', error: error.message });
    }
};

/**
 * Memperbarui kuantitas item tertentu di keranjang.
 */
exports.updateCart = async (req, res) => {
    try {
        const { id } = req.params; // ID item keranjang
        const { quantity } = req.body;
        const user_id = req.user.id; // Diambil dari token

        // Validasi input
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Kuantitas valid harus disediakan.' });
        }

        // Cari item keranjang dan pastikan item tersebut milik user yang sedang login
        const cartItem = await CartItem.findOne({
            where: { id, user_id }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item keranjang tidak ditemukan atau bukan milik pengguna ini.' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Kuantitas berhasil diperbarui.', cartItem });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Gagal memperbarui kuantitas item keranjang.', error: error.message });
    }
};

/**
 * Menghapus item tertentu dari keranjang.
 */
exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params; // ID item keranjang
        const user_id = req.user.id; // Diambil dari token

        // Cari item keranjang dan pastikan item tersebut milik user yang sedang login
        const cartItem = await CartItem.findOne({
            where: { id, user_id }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item keranjang tidak ditemukan atau bukan milik pengguna ini.' });
        }

        await cartItem.destroy();

        res.status(200).json({ message: 'Item berhasil dihapus dari keranjang.' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: 'Gagal menghapus item dari keranjang.', error: error.message });
    }
};