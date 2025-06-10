const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Gagal koneksi ke database MySQL:', err.message);
    process.exit(1);
  }
  console.log('Terkoneksi ke database MySQL.');
});

// error koneksi yang terjadi setelah jalan
db.on('error', (err) => {
  console.error('Error koneksi MySQL saat runtime:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
    console.log('Menunggu untuk reconnect atau mati...');
    process.exit(1); // atau restart dengan PM2 / nodemon
  }
});

module.exports = db.promise();
