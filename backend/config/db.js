const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
   process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
    logging: false
  }
);

// Cek koneksi saat aplikasi start
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Terkoneksi ke database MySQL via Sequelize.');
  } catch (err) {
    console.error('Gagal koneksi Sequelize:', err.message);
    process.exit(1);
  }
})();

module.exports = sequelize;
