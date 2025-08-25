const { Order, OrderItem, Product } = require('../models/associations'); // Asumsi semua model diekspor dari associations.js
const sequelize = require('../config/database'); // Digunakan untuk transaksi

/**
 * Membuat pesanan baru dari item-item di keranjang pengguna.
 * Melibatkan transaksi database untuk memastikan konsistensi data.
 */
exports.createOrder = async (req, res) => {
    // Mulai transaksi database
    const t = await sequelize.transaction();
    try {
        const userId = req.user.id; // ID pengguna dari token yang diverifikasi
        const { alamat, cartItems, grandTotal, ongkir, metodePembayaran } = req.body;

        // Validasi data masukan
        if (!cartItems || cartItems.length === 0) {
            await t.rollback();
            return res.status(400).json({ message: 'Keranjang belanja kosong.' });
        }
        if (!alamat || !grandTotal || !metodePembayaran) {
            await t.rollback();
            return res.status(400).json({ message: 'Data pesanan tidak lengkap.' });
        }

        // Mapping nilai ongkir numerik ke label string
        const shippingMethodLabel = {
            10000: 'JNE',
            12000: 'TIKI',
            8000: 'SiCepat',
        }[ongkir];

        // Mapping metode pembayaran dari frontend ke nilai yang tersimpan di DB
        const paymentMethodValue = {
            bca: 'bca',
            bni: 'bni',
            mandiri: 'mandiri',
            gopay: 'gopay',
            ovo: 'ovo',
            dana: 'dana',
            cod: 'cod'
        }[metodePembayaran];

        // Buat entri pesanan baru di tabel 'orders'
        const newOrder = await Order.create({
            user_id: userId,
            total_price: grandTotal,
            shipping_name: alamat.namaLengkap,
            shipping_address: `${alamat.alamatLengkap}, Kel. ${alamat.kelurahan}, Kec. ${alamat.kecamatan}, Kota ${alamat.kota}, ${alamat.provinsi} ${alamat.detailLainnya ? `(${alamat.detailLainnya})` : ''}`,
            shipping_phone: alamat.nomorTelepon,
            shipping_city: alamat.kota,
            shipping_postal_code: alamat.shipping_postal_code || '',
            shipping_method: shippingMethodLabel,
            payment_method: paymentMethodValue,
            order_date: new Date(),
            status: 'pending', // Status awal pesanan
        }, { transaction: t });

        // Proses setiap item di keranjang
        await Promise.all(
            cartItems.map(async (item) => {
                // Cari produk untuk memverifikasi stok
                const product = await Product.findByPk(item.id, { transaction: t });
                if (!product || product.stock < item.quantity) {
                    throw new Error(`Stok untuk produk ${item.name} tidak mencukupi atau produk tidak ditemukan.`);
                }
                
                // Buat entri OrderItem
                await OrderItem.create({
                    order_id: newOrder.id,
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price, // Harga saat pesanan dibuat
                }, { transaction: t });
                
                // Kurangi stok produk
                await Product.decrement('stock', { by: item.quantity, where: { id: item.id }, transaction: t });
            })
        );
        
        // Commit transaksi jika semua operasi berhasil
        await t.commit();
        res.status(201).json({ 
            message: 'Pesanan berhasil dibuat!', 
            orderId: newOrder.id, 
            order: newOrder // Kirim objek order lengkap jika diperlukan
        });

    } catch (error) {
        // Rollback transaksi jika terjadi kesalahan
        await t.rollback();
        console.error('Gagal membuat pesanan:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};

/**
 * Mengambil daftar semua pesanan yang dibuat oleh pengguna yang sedang login.
 */
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; // ID pengguna dari token
        if (!userId) {
            return res.status(401).json({ message: 'Pengguna tidak terautentikasi.' });
        }
        
        const orders = await Order.findAll({ 
            where: { user_id: userId },
            include: [{ 
                model: OrderItem, 
                include: [{ 
                    model: Product,
                    attributes: ['id', 'name', 'images'] // Hanya ambil data produk yang relevan
                }] 
            }],
            order: [['order_date', 'DESC']] // Urutkan dari pesanan terbaru
        });

        // Format data pesanan agar sesuai dengan kebutuhan frontend (opsional)
        const formattedOrders = orders.map(order => ({
            id: order.id,
            date: new Date(order.order_date).toLocaleDateString("id-ID"), // Format tanggal
            status: order.status,
            total: order.total_price,
            items: order.OrderItems.map(item => ({
                productName: item.Product.name,
                quantity: item.quantity,
                price: item.price,
                imageUrl: item.Product.images ? JSON.parse(item.Product.images)[0] : null // Asumsi gambar pertama
            }))
        }));

        res.status(200).json({ orders: formattedOrders }); // Kirim dalam objek dengan kunci 'orders'
    } catch (error) {
        console.error('Gagal mengambil riwayat pesanan:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};

/**
 * Mengambil detail spesifik dari sebuah pesanan milik pengguna yang sedang login.
 */
exports.getOrderDetails = async (req, res) => {
    const orderId = req.params.id; // ID pesanan dari parameter URL
    try {
        const userId = req.user.id; // ID pengguna dari token
        
        const order = await Order.findByPk(orderId, {
            where: { user_id: userId }, // Pastikan pesanan ini milik pengguna yang meminta
            include: [{ 
                model: OrderItem, 
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'description', 'price', 'images']
                }]
            }]
        });

        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan atau Anda tidak memiliki akses.' });
        }
        res.status(200).json({ order });
    } catch (error) {
        console.error('Gagal mengambil detail pesanan:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};