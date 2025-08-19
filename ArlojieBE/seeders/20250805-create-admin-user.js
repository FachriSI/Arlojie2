'use strict';
const bcrypt = require('bcrypt');
// Perbaikan: Hapus destructuring karena model biasanya diekspor langsung
// const User = require('../models/users'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('admin1', 10);
    const hashedPassword2 = await bcrypt.hash('admin2', 10);
    
    // Perbaikan: Pastikan nama tabel di sini adalah 'users' (huruf kecil)
    await queryInterface.bulkInsert('users', [
      {
        name: 'miminsatu',
        email: 'admin1@gmail.com',
        password: hashedPassword1,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'mimindua',
        email: 'admin2@gmail.com',
        password: hashedPassword2,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Perbaikan: Pastikan nama tabel di sini adalah 'users'
    await queryInterface.bulkDelete('users', {
      email: ['admin1@gmail.com', 'admin2@gmail.com']
    });
  },
};