const Joi = require('joi')

const irrigationSchema = Joi.object({
    pond_id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID Kolam harus berupa angka',
        'number.integer': 'ID Kolam harus bilangan bulat',
        'number.positive': 'ID Kolam harus lebih dari 0',
        'any.required': 'ID Kolam wajib diisi',
    }),
    irrigation_date: Joi.date().iso().required().messages({
        'date.base': 'Tanggal harus berupa format tanggal',
        'date.format': 'Tanggal harus dalam format ISO (YYYY-MM-DD)',
        'any.required': 'Tanggal wajib diisi',
    }),
    duration_minutes: Joi.number().positive().required().messages({
        'number.base': 'Durasi harus berupa angka',
        'number.positive': 'Durasi harus lebih dari 0',
        'any.required': 'Durasi wajib diisi',
    }),
    notes: Joi.string().allow(null, '').max(255).messages({
        'string.max': 'Catatan maksimal 255 karakter',
    }),
})

module.exports = irrigationSchema