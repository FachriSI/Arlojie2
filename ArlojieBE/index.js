const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
require('./models/associations'); 

const adminUserRoutes = require('./routes/adminUserRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/products', productRoutes);
app.use('/api', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminOrderRoutes);
app.use('/api/admin', adminUserRoutes); 

app.get('/', (req, res) => {
  res.send('API berjalan dengan baik!');
});

sequelize.sync()
  .then(() => {
    console.log('Database & tabel berhasil disinkronisasi!');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal sinkronisasi database:', err.message);
  });
