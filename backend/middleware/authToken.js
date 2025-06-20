const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization?.split(' ')[1] || // kalau kirim via header
    req.cookies?.token;                        // kalau kirim via cookie

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Access denied.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan payload token ke request
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

module.exports = authenticateToken;
