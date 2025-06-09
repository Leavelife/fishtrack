const express = require('express');
const app = express();
const pondRoutes = require('./routes/pondRoutes');
const feedRoutes = require('./routes/feedRoutes');
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/api/ponds', pondRoutes);
app.use('/api/feeds', feedRoutes);

// TODO: tambahkan routes lain
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
