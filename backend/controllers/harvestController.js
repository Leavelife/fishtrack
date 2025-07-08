const Harvest = require('../models/harvestModel');
const sendResponse = require('../utils/sendResponse');

exports.getAllHarvests = async (req, res, next) => {
  try {
    const harvests = await Harvest.findAll();
    sendResponse(res, {
      message: 'All harvest records fetched successfully',
      data: harvests,
    });
  } catch (err) {
    console.error('[GET /harvest] Error:', err.message);
    next(err);
  }
};

exports.getHarvestById = async (req, res, next) => {
  try {
    const harvest = await Harvest.findAll({where: {pond_id: req.params.id}});
    if (!harvest) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Harvest record not found',
      });
    }

    sendResponse(res, {
      message: 'Harvest record fetched successfully',
      data: harvest,
    });
  } catch (err) {
    console.error(`[GET /harvest/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.createHarvest = async (req, res, next) => {
  try {
    const newData = await Harvest.create(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: 'Harvest record created successfully',
      data: newData,
    });
  } catch (err) {
    console.error('[POST /harvest] Error:', err.message);
    next(err);
  }
};

exports.updateHarvest = async (req, res, next) => {
  try {
    const [updated] = await Harvest.update(req.body, {where: {id: req.params.id}});
    if (updated === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Harvest record not found',
      });
    }

    const updatedHarvest = await Harvest.findByPk(req.params.id);
    sendResponse(res, {
      message: 'Harvest record updated successfully',
      data: updatedHarvest,
    });
  } catch (err) {
    console.error(`[PUT /harvest/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.deleteHarvest = async (req, res, next) => {
  try {
    const deleted = await Harvest.destroy({where: {id: req.params.id},});
    if (deleted === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Harvest record not found',
      });
    }

    sendResponse(res, {
      message: 'Harvest record deleted successfully',
    });
  } catch (err) {
    console.error(`[DELETE /harvest/${req.params.id}] Error:`, err.message);
    next(err);
  }
};
