const Irrigation = require('../models/irrigationModel');
const sendResponse = require('../utils/sendResponse');

exports.getAllIrrigations = async (req, res, next) => {
  try {
    const irrigations = await Irrigation.findAll();
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
    const irrigation = await Irrigation.findAll({where: {pond_id: req.params.pond_id}});
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
    const update = await Irrigation.update(req.body, {where: {id: req.params.id}});
    if (update === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Irrigation record not found',
      });
    }

    const updatedIrrigation = await Irrigation.findByPk(req.params.id)
    sendResponse(res, {
      message: 'Irrigation record updated successfully',
      data: updatedIrrigation,
    });
  } catch (err) {
    console.error(`[PUT /irrigation/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.deleteIrrigation = async (req, res, next) => {
  try {
    const deleted = await Irrigation.destroy({where: {id: req.params.id}});
    if (deleted === 0) {
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
