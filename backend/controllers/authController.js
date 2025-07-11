const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendResponse = require('../utils/sendResponse');
const { registerSchema, loginSchema } = require('../validations/authValidation');

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

exports.login = async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.details[0].message,
    });
  }

  const { email, password } = value;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '60m' }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    
    // Kirim cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000 
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    sendResponse(res, {
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      },
    });
  } catch (err) {
    console.error('[LOGIN ERROR]', err.message);
    next(err);
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
