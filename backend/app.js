const express = require('express');
const app = express();
const pondRoutes = require('./routes/pondRoutes');
const feedRoutes = require('./routes/feedRoutes');
const irrigationRoutes = require('./routes/irrigRoutes');
const errorHandler = require('./middleware/errorHandle')
require('dotenv').config();
app.use(express.json());

// Routes
app.use('/api/ponds', pondRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/irrigation', irrigationRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
