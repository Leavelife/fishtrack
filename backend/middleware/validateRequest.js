const sendResponse = require('../utils/sendResponse');

const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Validasi gagal',
      data: messages,
    });
  }

  // Ganti body dengan value yang sudah divalidasi dan dibersihkan
  req.body = value;
  next();
};

module.exports = validateRequest;
