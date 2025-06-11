const express = require('express');
const app = express();
const pondRoutes = require('./routes/pondRoutes');
const feedRoutes = require('./routes/feedRoutes');
const irrigationRoutes = require('./routes/irrigRoutes');
const mortalitiesRoutes = require('./routes/mortalRoutes')
const harvestRoutes = require('./routes/harvestRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

const errorHandler = require('./middleware/errorHandle')


require('dotenv').config();
app.use(express.json());

// Routes
app.use('/api/ponds', pondRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/mortalities', mortalitiesRoutes)
app.use('/api/harvest', harvestRoutes)
app.use('/api/transaction', transactionRoutes)

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
