const Joi = require('joi')

const PondSchema = Joi.object({
    fish_type: Joi.string().valid('lele', 'nila', 'gurame').required().messages({
        'string.base': 'Jenis Ikan harus berupa teks',
        'any.only': 'Jenis Ikan hanya boleh "lele", "nila" atau "gurame"',
        'any.required': 'Jenis ikan wajib diisi',
    }),
    width: Joi.number().positive().required().messages({
        'number.base': 'Lebar harus berupa angka',
        'number.positive': 'Lebar harus lebih dari 0',
        'any.required': 'Lebar wajib diisi',
    }),
    length: Joi.number().positive().required().messages({
        'number.base': 'Panjang harus berupa angka',
        'number.positive': 'Panjang harus lebih dari 0',
        'any.required': 'Panjang wajib diisi',
    }),
    density: Joi.number().positive().required().messages({
        'number.base': 'Kepadatan harus berupa angka',
        'number.positive': 'Kepadatan harus lebih dari 0',
        'any.required': 'Kepadatan wajib diisi',
    }),
    start_date: Joi.date().iso().required().messages({
        'date.base': 'Tanggal harus berupa format tanggal',
        'date.format': 'Tanggal harus dalam format ISO (YYYY-MM-DD)',
        'any.required': 'Tanggal wajib diisi',
    }),
    status: Joi.string().valid('aktif', 'panen', 'kosong').required().messages({
        'string.base': 'Status kolam harus berupa teks',
        'any.only': 'Status kolam hanya boleh "aktif", "panen" atau "kosong"',
        'any.required': 'Status kolam wajib diisi',
    }),
})
module.exports = PondSchema