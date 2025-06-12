const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // validasi email dasar
    .pattern(/@gmail\.com$/) // hanya izinkan gmail.com
    .required()
    .messages({
      'string.email': 'Email tidak valid',
      'string.pattern.base': 'Hanya email @gmail.com yang diizinkan',
    }),
  password: Joi.string()
    .min(7)
    .required()
    .messages({
      'string.min': 'Password minimal 7 karakter',
    }),
  role: Joi.string().valid('owner', 'karyawan', 'pengguna').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/@gmail\.com$/)
    .required(),
  password: Joi.string().min(7).required(),
});

module.exports = {registerSchema, loginSchema};
