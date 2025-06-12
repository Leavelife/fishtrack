const Joi = require('joi');

const transactionSchema = Joi.object({
  date: Joi.date().iso().required().messages({
    'date.base': 'Tanggal harus berupa format tanggal',
    'date.format': 'Tanggal harus dalam format ISO (YYYY-MM-DD)',
    'any.required': 'Tanggal wajib diisi',
  }),

  pond_id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID Kolam harus berupa angka',
    'number.integer': 'ID Kolam harus bilangan bulat',
    'number.positive': 'ID Kolam harus lebih dari 0',
    'any.required': 'ID Kolam wajib diisi',
  }),

  type: Joi.string().valid('income', 'expance').required().messages({
    'any.only': 'Type hanya boleh "income" atau "expance"',
    'any.required': 'Type wajib diisi',
  }),

  category: Joi.string().max(100).required().messages({
    'string.base': 'Kategori harus berupa teks',
    'string.max': 'Kategori maksimal 100 karakter',
    'any.required': 'Kategori wajib diisi',
  }),

  amount: Joi.number().positive().required().messages({
    'number.base': 'Jumlah harus berupa angka',
    'number.positive': 'Jumlah harus lebih dari 0',
    'any.required': 'Jumlah wajib diisi',
  }),

  description: Joi.string().allow(null, '').max(255).messages({
    'string.max': 'Deskripsi maksimal 255 karakter',
  }),
});

module.exports = transactionSchema;
