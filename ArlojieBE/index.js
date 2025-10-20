const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
require('./models/associations'); 

const cartRoutes = require('./routes/cartRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const adminAnalyticsRoutes = require('./routes/adminAnalyticsRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');

const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminOrderRoutes);
app.use('/api/admin', adminUserRoutes); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/admin', adminAnalyticsRoutes);
app.use('/api/admin', adminDashboardRoutes);
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.send('API berjalan dengan baik!');
});

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Database & tabel berhasil disinkronisasi!');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal sinkronisasi database:', err.message);
  });
