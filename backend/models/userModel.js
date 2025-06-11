const db = require('../configs/db');
const bcrypt = require('bcrypt');

const User = {
  // Cari user berdasarkan email
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // bisa null jika tidak ditemukan
  },

  // Validasi password (input dari user vs hashed password di DB)
  validatePassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },
};

module.exports = User;
