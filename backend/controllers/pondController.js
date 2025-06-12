const Pond = require('../models/pondModel');
const createError = require('http-errors')
const sendResponse = require('../utils/sendResponse')

// Get all ponds
exports.getAllPonds = async (req, res, next) => {
  try {
    const ponds = await Pond.findAll();

    if (!ponds.length) {
      return next(createError(404, 'No ponds found'));
    }
    return sendResponse(res, {
      message: 'Ponds fetched successfully',
      data: ponds,
    });

  } catch (err) {
    next(err)
  }
};

// Get pond by ID
exports.getPondById = async (req, res, next) => {
  try {
    const pond = await Pond.findByPk(req.params.id);

    if (!pond) {
      return next(createError(404, 'Pond not found'));
    }

    return sendResponse(res, {
      message: 'Pond fetched successfully',
      data: pond,
    });
  } catch (err) {
    console.error(`[GET /ponds/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

// Create new pond
exports.createPond = async (req, res, next) => {
  try {
    const newPond = await Pond.create(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: 'Pond created successfully',
      data: newPond,
    });
  } catch (err) {
    console.error('[POST /ponds] Error:', err.message);
    next(err);
  }
};

// Update pond
exports.updatePond = async (req, res, next) => {
  try {
    const updatePond = await Pond.update(req.body, {where: {id: req.params.id}});

    if (updatePond === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Pond not found',
      });
    }

    const updatedPond = await Pond.findByPk(req.params.id)
    sendResponse(res, {
      message: 'Pond updated successfully',
      data: updatedPond,
    });
  } catch (err) {
    console.error(`[PUT /ponds/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

// Delete pond
exports.deletePond = async (req, res, next) => {
  try {
    const deletedPond = await Pond.destroy({where: {id: req.params.id}});

    if (deletedPond === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Pond not found',
      });
    }

    sendResponse(res, {
      message: 'Pond deleted successfully',
      data: deletedPond,
    });
  } catch (err) {
    console.error(`[DELETE /ponds/${req.params.id}] Error:`, err.message);
    next(err);
  }
};