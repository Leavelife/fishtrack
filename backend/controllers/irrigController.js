const Irrigation = require('../models/irrigationModel');
const sendResponse = require('../utils/sendResponse');

exports.getAllIrrigations = async (req, res, next) => {
  try {
    const irrigations = await Irrigation.getAll();
    sendResponse(res, {
      message: 'All irrigation records fetched successfully',
      data: irrigations,
    });
  } catch (err) {
    console.error('[GET /irrigation] Error:', err.message);
    next(err);
  }
};

exports.getIrrigationById = async (req, res, next) => {
  try {
    const irrigation = await Irrigation.getById(req.params.id);
    if (!irrigation) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Irrigation record not found',
      });
    }

    sendResponse(res, {
      message: 'Irrigation record fetched successfully',
      data: irrigation,
    });
  } catch (err) {
    console.error(`[GET /irrigation/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.createIrrigation = async (req, res, next) => {
  try {
    const newData = await Irrigation.create(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: 'Irrigation record created successfully',
      data: newData,
    });
  } catch (err) {
    console.error('[POST /irrigation] Error:', err.message);
    next(err);
  }
};

exports.updateIrrigation = async (req, res, next) => {
  try {
    const updated = await Irrigation.update(req.params.id, req.body);
    if (!updated) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Irrigation record not found',
      });
    }

    sendResponse(res, {
      message: 'Irrigation record updated successfully',
      data: updated,
    });
  } catch (err) {
    console.error(`[PUT /irrigation/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.deleteIrrigation = async (req, res, next) => {
  try {
    const deleted = await Irrigation.delete(req.params.id);
    if (!deleted) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Irrigation record not found',
      });
    }

    sendResponse(res, {
      message: 'Irrigation record deleted successfully',
    });
  } catch (err) {
    console.error(`[DELETE /irrigation/${req.params.id}] Error:`, err.message);
    next(err);
  }
};
