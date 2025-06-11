const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendResponse = require('../utils/sendResponse'); // helper custom kamu
const dotenv = require('dotenv');
dotenv.config();

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: 'Email dan password wajib diisi',
      });
    }

    // Cek apakah user ada
    const user = await User.findByEmail(email);
    if (!user) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Email atau password salah',
      });
    }

    // Validasi password
    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Email atau password salah',
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Simpan token di cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true kalau deploy
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    // Kirim respon
    sendResponse(res, {
      message: 'Login berhasil',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error('[POST /login] Error:', err.message);
    next(err);
  }
};
