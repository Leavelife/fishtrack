
module.exports = (err, req, res, next) => {
  console.error('[ERROR]', {
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

