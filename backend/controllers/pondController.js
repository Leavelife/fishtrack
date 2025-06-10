const Pond = require('../models/pondModel');
const createError = require('http-errors')
const sendResponse = require('../utils/sendResponse')

// Get all ponds
exports.getAllPonds = async (req, res, next) => {
  try {
    const ponds = await Pond.getAll();

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
    const { id } = req.params;
    const pond = await Pond.getById(id);

    if (!pond) {
      return next(createError(404, 'Pond not found'));
    }

    return sendResponse(res, {
      message: 'Pond fetched successfully',
      data: pond,
    });
  } catch (err) {
    console.error('[GET /ponds/:id] Error:', err.message);
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
    const updatedPond = await Pond.update(req.params.id, req.body);

    if (!updatedPond) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Pond not found',
      });
    }

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
    const deletedPond = await Pond.delete(req.params.id);

    if (!deletedPond) {
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