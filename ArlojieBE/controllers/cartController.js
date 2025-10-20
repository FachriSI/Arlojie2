const CartItem = require('../models/cart_items');
const Product = require('../models/products'); 
const sequelize = require('sequelize'); 
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; 
        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Product ID dan kuantitas valid harus disediakan.' });
        }

        let cartItem = await CartItem.findOne({
            where: { userId, productId }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Kuantitas item keranjang berhasil diperbarui.', cartItem });
        } else {
            cartItem = await CartItem.create({ userId, productId, quantity });
            return res.status(201).json({ message: 'Item berhasil ditambahkan ke keranjang.', cartItem });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Gagal menambahkan item ke keranjang.', error: error.message });
    }
};
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await CartItem.findAll({
            where: { userId },
            include: [{ 
                model: Product, 
                attributes: ['id', 'name', 'price', 'images'] 
            }],
            order: [['createdAt', 'ASC']],
        });
        res.status(200).json({ cartItems });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Gagal memuat keranjang.', error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { id } = req.params; 
        const { quantity } = req.body;
        const userId = req.user.id; 

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Kuantitas valid harus disediakan.' });
        }
        const cartItem = await CartItem.findOne({
            where: { id, userId }
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

exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user.id; 

        const cartItem = await CartItem.findOne({
            where: { id, userId }
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