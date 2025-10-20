const { Order, OrderItem, Product } = require('../models/associations');
const sequelize = require('../config/database');

exports.createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const userId = req.user.id;
        const { 
            namaLengkap,
            nomorTelepon,
            provinsi,
            kota,
            kecamatan,
            kelurahan,
            alamatLengkap,
            kodePos,
            shippingMethod,
            paymentMethod,
            totalPrice,
            items 
        } = req.body;

        if (!items || items.length === 0) {
            await t.rollback();
            return res.status(400).json({ message: 'Keranjang belanja kosong.' });
        }
        if (!namaLengkap || !provinsi || !kota || !alamatLengkap || !kodePos || !shippingMethod || !paymentMethod) {
            await t.rollback();
            return res.status(400).json({ message: 'Data pesanan tidak lengkap.' });
        }
        
        const newOrder = await Order.create({
            userId: userId,
            totalPrice: totalPrice,
            namaLengkap: namaLengkap,
            nomorTelepon: nomorTelepon,
            provinsi: provinsi,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            alamatLengkap: alamatLengkap,
            kota: kota,
            kodePos: kodePos,
            shippingMethod: shippingMethod,
            paymentMethod: paymentMethod,
            orderDate: new Date(),
            status: 'pending', 
        }, { transaction: t });
        
        // Validate products status and stock before creating order items
        const inactiveProducts = [];
        await Promise.all(
            items.map(async (item) => {
                const product = await Product.findByPk(item.productId, { transaction: t });
                if (!product) {
                    throw new Error(`Produk ID ${item.productId} tidak ditemukan.`);
                }
                // check if product is active
                const status = (product.status || '').toString().toLowerCase();
                if (status !== 'aktif') {
                    inactiveProducts.push(product.name || `ID ${product.id}`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Stok untuk produk ID ${item.productId} tidak mencukupi.`);
                }
            })
        );

        if (inactiveProducts.length > 0) {
            await t.rollback();
            return res.status(400).json({ message: `Beberapa produk sedang nonaktif/tidak dijual: ${inactiveProducts.join(', ')}. Silakan hapus produk tersebut dari keranjang sebelum checkout.` });
        }

        // create order items and decrement stock
        await Promise.all(
            items.map(async (item) => {
                const product = await Product.findByPk(item.productId, { transaction: t });
                await OrderItem.create({
                    orderId: newOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                }, { transaction: t });
                await product.decrement('stock', { by: item.quantity, transaction: t });
            })
        );

        // After creating order items, remove the purchased items from the user's cart
        try {
            const { Op } = require('sequelize');
            const CartItem = require('../models/cart_items');
            // normalize and dedupe product ids
            const productIds = Array.from(new Set(items.map(i => Number(i.productId)).filter(id => !Number.isNaN(id))));
            console.log('Menghapus cartItems untuk user:', userId, 'productIds:', productIds);
            const deleted = await CartItem.destroy({
                where: { userId: userId, productId: { [Op.in]: productIds } },
                transaction: t,
            });
            console.log(`Cart cleanup removed ${deleted} rows for user ${userId}`);
        } catch (cartErr) {
            console.error('Gagal menghapus item keranjang setelah pemesanan:', cartErr);
        }
        
        await t.commit();
        res.status(201).json({ 
            message: 'Pesanan berhasil dibuat!', 
            orderId: newOrder.id, 
            order: newOrder 
        });

    } catch (error) {
        await t.rollback();
        console.error('Gagal membuat pesanan:', error);

        let statusCode = 500;
        if(error.message.includes('Stok') || error.message.includes('tidak mencukupi')) {
            statusCode = 400;
        }
        
        res.status(statusCode).json({ message: 'Terjadi kesalahan saat memproses pesanan.', error: error.message });
    }
};
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Pengguna tidak terautentikasi." });
    }

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "images"],
            },
          ],
        },
      ],
      order: [["orderDate", "DESC"]],
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      date: new Date(order.orderDate).toLocaleDateString("id-ID"),
      status: order.status,
      total: parseInt(order.totalPrice),
      namaLengkap: order.namaLengkap,
      alamatLengkap: order.alamatLengkap + ", " + order.kelurahan + ", " + order.kecamatan + ", " + order.kota + ", " + order.provinsi + " ("+ order.kodePos + ").",
      shippingMethod: order.shippingMethod, 
      paymentMethod: order.paymentMethod,   
      items: order.OrderItems.map((item) => ({
        productName: item.Product?.name || "-",
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.Product?.images
          ? JSON.parse(item.Product.images)[0]
          : null,
      })),
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error("Gagal mengambil riwayat pesanan:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
  }
};

// Fungsi ini untuk mengambil detail satu pesanan spesifik
exports.getOrderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const userId = req.user.id;
        
        const order = await Order.findOne({
            where: { id: id, userId: userId },
            include: [{ 
                model: OrderItem,
                as: 'OrderItems',
                include: [{
                    model: Product,
                    as: 'Product',
                    attributes: ['id', 'name', 'description', 'price', 'images']
                }]
            }]
        });

        if (!order) {
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }
        // simplify and return only needed fields for frontend
        const response = {
            id: order.id,
            orderDate: order.orderDate,
            status: order.status,
            totalPrice: order.totalPrice,
            namaLengkap: order.namaLengkap,
            nomorTelepon: order.nomorTelepon,
            alamatLengkap: order.alamatLengkap,
            provinsi: order.provinsi,
            kota: order.kota,
            kecamatan: order.kecamatan,
            kelurahan: order.kelurahan,
            kodePos: order.kodePos,
            shippingMethod: order.shippingMethod,
            paymentMethod: order.paymentMethod,
            items: order.OrderItems.map(item => ({
                productId: item.productId,
                name: item.Product ? item.Product.name : null,
                description: item.Product ? item.Product.description : null,
                price: item.price,
                quantity: item.quantity,
                images: item.Product && item.Product.images ? JSON.parse(item.Product.images) : []
            }))
        };

        res.status(200).json({ order: response });
    } catch (error) {
        console.error('Gagal mengambil detail pesanan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};

// Cancel (delete) an order: mark as 'cancelled' and remove associated OrderItems
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
        const userId = req.user.id;
        const order = await Order.findOne({ where: { id, userId }, transaction: t });
        if (!order) {
            await t.rollback();
            return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
        }

        // Soft-cancel: update status to 'cancelled' but keep OrderItems so products remain visible
        await order.update({ status: 'cancelled' }, { transaction: t });

        await t.commit();
        // Optionally return the updated order id and new status
        res.status(200).json({ message: 'Pesanan berhasil dibatalkan.', orderId: order.id, status: order.status });
    } catch (error) {
        await t.rollback();
        console.error('Gagal membatalkan pesanan:', error);
        res.status(500).json({ message: 'Gagal membatalkan pesanan.', error: error.message });
    }
};