const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const associations = require('./models/associations');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', productRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api', cartRoutes); 
app.use('/api', orderRoutes); 


app.get('/', (req, res) => {
  res.send('API berjalan dengan baik!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

sequelize.sync({ alter: true }) // Sinkronisasi sekali saja
  .then(() => {
    console.log('Database & tabel berhasil disinkronisasi!');
  })
  .catch((err) => {
    console.error('Gagal sinkronisasi database:', err.message);
  });


