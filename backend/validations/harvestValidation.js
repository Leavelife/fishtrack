const Joi = require('joi')

const harvestSchema = Joi.object({
    pond_id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID Kolam harus berupa angka',
        'number.integer': 'ID Kolam harus bilangan bulat',
        'number.positive': 'ID Kolam harus lebih dari 0',
        'any.required': 'ID Kolam wajib diisi',
    }),
    harvest_date: Joi.date().iso().required().messages({
        'date.base': 'Tanggal harus berupa format tanggal',
        'date.format': 'Tanggal harus dalam format ISO (YYYY-MM-DD)',
        'any.required': 'Tanggal wajib diisi',
    }),
    weight_kg: Joi.number().positive().required().messages({
        'number.base': 'Berat harus berupa angka',
        'number.positive': 'Berat harus lebih dari 0',
        'any.required': 'Berat wajib diisi',
    }),
    price_per_kg: Joi.number().positive().required().messages({
        'number.base': 'Jumlah harus berupa angka',
        'number.positive': 'Jumlah harus lebih dari 0',
        'any.required': 'Harga per kilogram wajib diisi',
    }),
    buyer: Joi.string().max(100).required().messages({
        'string.base': 'Pembeli harus berupa teks',
        'string.max': 'Nama Pembeli maksimal 100 karakter',
        'any.required': 'Pembeli wajib diisi',
    }),
});

module.exports = harvestSchema;