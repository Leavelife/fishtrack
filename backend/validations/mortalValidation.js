const Joi = require('joi')

const mortalitySchema = Joi.object({
    pond_id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID Kolam harus berupa angka',
        'number.integer': 'ID Kolam harus bilangan bulat',
        'number.positive': 'ID Kolam harus lebih dari 0',
        'any.required': 'ID Kolam wajib diisi',
    }),
    date: Joi.date().iso().required().messages({
        'date.base': 'Tanggal harus berupa format tanggal',
        'date.format': 'Tanggal harus dalam format ISO (YYYY-MM-DD)',
        'any.required': 'Tanggal wajib diisi',
    }),
    cause: Joi.string().allow(null, '').max(255).messages({
        'string.max': 'Catatan maksimal 255 karakter',
    }),
    amount: Joi.number().positive().allow(null, '').messages({
        'number.base': 'Jumlah harus berupa angka',
        'number.positive': 'Durasi harus lebih dari 0',
    }),
    estimasi_mati: Joi.string().max(10).required().messages({
        'string.base': 'Estimasi mati harus berupa teks',
        'string.max': 'Estimasi mati maksimal 10 karakter',
        'any.required': 'Estimasi mati wajib diisi',
    }),
    notes: Joi.string().allow(null, '').max(255).messages({
        'string.max': 'Catatan maksimal 255 karakter',
    }),
})

module.exports = mortalitySchema