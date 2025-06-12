const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const { sequelize } = require('./models');
const pondRoutes = require('./routes/pondRoutes');
const feedRoutes = require('./routes/feedRoutes');
const irrigationRoutes = require('./routes/irrigRoutes');
const mortalitiesRoutes = require('./routes/mortalRoutes')
const harvestRoutes = require('./routes/harvestRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const authRoutes = require('./routes/authRoutes')
const roleRoutes = require('./routes/role');
const dashboard = require('./routes/dashboard')

const errorHandler = require('./middleware/errorHandle')

require('dotenv').config();
app.use(express.json());
app.use(cookieParser())

// Routes
app.use('/api/ponds', pondRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/mortalities', mortalitiesRoutes)
app.use('/api/harvest', harvestRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/role', roleRoutes);
app.use('/dashboard', dashboard)

app.use(errorHandler)

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tabel Sequelize sinkron.');
    app.listen(process.env.PORT, () => {
      console.log(`Server berjalan di port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal sinkronisasi Sequelize:', err.message);
  });