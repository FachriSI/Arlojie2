'use strict';

const { DataTypes } = require('sequelize'); // Pastikan DataTypes diimpor jika diperlukan

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Jam Tangan Longines Master',
        price: 4545000,
        description: 'Jam tangan elegan dengan strap stainless steel. Cocok untuk acara formal.',
        stock: 50,
        category: 'Jam Tangan Pria',
        status: 'aktif',
        images: JSON.stringify([
          'uploads/products/longines_1.jpg',
          'uploads/products/longines_2.jpg',
          'uploads/products/longines_3.jpg'
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jam Tangan Casio Pinkish',
        price: 950000,
        description: 'Jam tangan casual untuk wanita dengan warna cerah dan fitur tahan air.',
        stock: 35,
        category: 'Jam Tangan Wanita',
        status: 'aktif',
        images: JSON.stringify([
          'uploads/products/casio_pink_1.jpg',
          'uploads/products/casio_pink_2.jpg',
          'uploads/products/casio_pink_3.jpg'
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jam Tangan Anak Unicorn',
        price: 250000,
        description: 'Jam tangan lucu dengan desain unicorn, cocok untuk anak-anak.',
        stock: 120,
        category: 'Jam Tangan Anak-anak',
        status: 'aktif',
        images: JSON.stringify([
          'uploads/products/unicorn_1.jpg',
          'uploads/products/unicorn_2.jpg',
          'uploads/products/unicorn_3.jpg'
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data dummy jika seeder di-rollback
    await queryInterface.bulkDelete('products', null, {});
  }
};