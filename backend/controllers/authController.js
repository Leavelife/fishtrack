const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../configs/db');
const sendResponse = require('../utils/sendResponse');

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !name) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Name, email, and password are required',
    });
  }

  try {
    // Cek apakah email sudah digunakan
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return sendResponse(res, {
        statusCode: 409,
        success: false,
        message: 'Email already registered',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user ke DB
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'owner']
    );

    // Ambil user yg baru dibuat
    const [newUserRows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [result.insertId]);
    const newUser = newUserRows[0];

    // Buat JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1d' }
    );

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: newUser
      }
    });
  } catch (err) {
    console.error('[REGISTER ERROR]', err.message);
    next(err);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    // Cek user berdasarkan email
    const [userResult] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (userResult.length === 0) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Invalid email or password',
      });
    }

    const user = userResult[0];

    // Bandingkan password input dengan hashed password di DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Buat JWT Token
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // bisa disesuaikan
    );

    // Kirim token lewat cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    return sendResponse(res, {
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('[LOGIN ERROR]', err.message);
    next(err);
  }
};
