const Joi = require('joi')

const feedSchema = Joi.object({
    
    pond_id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID Kolam harus berupa angka',
        'number.integer': 'ID Kolam harus bilangan bulat',
        'number.positive': 'ID Kolam harus lebih dari 0',
        'any.required': 'ID Kolam wajib diisi',
    }),
    feed_type: Joi.string().max(100).required().messages({
        'string.base': 'Pakan harus berupa teks',
        'string.max': 'Jenis Pakan maksimal 100 karakter',
        'any.required': 'Jenis Pakan wajib diisi',
    }),
    feed_date: Joi.date().iso().required().messages({
        'date.base': 'Tanggal harus berupa format tanggal',
        'date.format': 'Tanggal harus dalam format ISO (YYYY-MM-DD)',
        'any.required': 'Tanggal wajib diisi',
    }),
    amount_kg: Joi.number().positive().required().messages({
        'number.base': 'Jumlah harus berupa angka',
        'number.positive': 'Jumlah harus lebih dari 0',
        'any.required': 'Jumlah wajib diisi',
    }),

})
module.exports = feedSchema