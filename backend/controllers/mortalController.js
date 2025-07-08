const Mortality = require('../models/mortalityModel');
const sendResponse = require('../utils/sendResponse');

exports.getAllMortalities = async (req, res, next) => {
  try {
    const mortalities = await Mortality.findAll();
    sendResponse(res, {
      message: 'All mortality records fetched successfully',
      data: mortalities,
    });
  } catch (err) {
    console.error('[GET /mortalities] Error:', err.message);
    next(err);
  }
};

exports.getMortalityById = async (req, res, next) => {
  try {
    const mortality = await Mortality.findAll({where: {pond_id: req.params.id}});
    if (!mortality) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Mortality record not found',
      });
    }

    sendResponse(res, {
      message: 'Mortality record fetched successfully',
      data: mortality,
    });
  } catch (err) {
    console.error(`[GET /mortalities/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.createMortality = async (req, res, next) => {
  try {
    const newData = await Mortality.create(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: 'Mortality record created successfully',
      data: newData,
    });
  } catch (err) {
    console.error('[POST /mortalities] Error:', err.message);
    next(err);
  }
};

exports.updateMortality = async (req, res, next) => {
  try {
    const update = await Mortality.update(req.body, {where: {id: req.params.id}});
    if (update === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Mortality record not found',
      });
    }

    const updatedMortalities = await Mortality.findByPk(req.params.id)
    sendResponse(res, {
      message: 'Mortality record updated successfully',
      data: updatedMortalities,
    });
  } catch (err) {
    console.error(`[PUT /mortalities/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.deleteMortality = async (req, res, next) => {
  try {
    const deleted = await Mortality.destroy({where: {id: req.params.id}});
    if (deleted === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Mortality record not found',
      });
    }

    sendResponse(res, {
      message: 'Mortality record deleted successfully',
    });
  } catch (err) {
    console.error(`[DELETE /mortalities/${req.params.id}] Error:`, err.message);
    next(err);
  }
};
