const bcrypt = require('bcryptjs');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendResponse = require('../utils/sendResponse');  
const { registerSchema, loginSchema } = require('../validations/authValidation');
const admin = require('../utils/firebaseAdmin'); 

exports.refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '60m' }
    );

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000
    });

    return res.json({ success: true, message: 'Access token refreshed' });
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

exports.register = async (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.details[0].message,
    });
  }

  const { name, email, password, role } = value;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendResponse(res, {
        statusCode: 409,
        success: false,
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'pengguna'
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '60m' }
    );
    const refreshToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Kirim cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000 
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
    });

    sendResponse(res, {
      statusCode: 201,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      }
    });
  } catch (err) {
    console.error('[REGISTER ERROR]', err.message);
    next(err);
  }
};

exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verifikasi token Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Cari user berdasarkan email
    let user = await User.findOne({ where: { email } });

    // Jika belum ada, buat user baru
    if (!user) {
      user = await User.create({
        name,
        email,
        password: null, // karena login Google, tidak pakai password
        role: "user",   // default role
      });
    }

    // Buat JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Invalid Google ID token" });
  }
};

exports.firebaseLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const {email, name, uid} = decodedToken;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        name: name || "new user", 
        email,
        password: null,
        role: "pengguna",
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Firebase login successful',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid Firebase ID token" });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return sendResponse(res, {
      message: 'Logout successful',
    });
  } catch (err) {
    console.error('[LOGOUT ERROR]', err.message);
    next(err);
  }
};
