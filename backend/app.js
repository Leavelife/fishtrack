const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
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

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.100.219:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json());
app.use(cookieParser())
require('dotenv').config();

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

sequelize.sync()
  .then(() => {
    console.log('Database & tabel Sequelize sinkron.');
    app.listen(process.env.DB_PORT, () => {
      console.log(`Server berjalan di port ${process.env.DB_PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal sinkronisasi Sequelize:', err.message);
  });

