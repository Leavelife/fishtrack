const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Ambil token dari header ATAU cookie
  const token =
    req.headers.authorization?.split(' ')[1] || // dari Authorization: Bearer <token>
    req.cookies?.token;                         // dari cookie

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Access denied.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan info user ke req
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
