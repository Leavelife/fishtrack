const Feed = require('../models/feedModel');
const createError =  require('http-errors')
const sendResponse = require('../utils/sendResponse')

exports.getAllFeeds = async (req, res, next) => {
  try {
    const feeds = await Feed.findAll();
    
    if (!feeds.length) {
      return next(createError(404, 'No feeds found'));
    }
    return sendResponse(res, {
      message: 'Feeds fetched successfully',
      data: feeds,
    });
  } catch (error) {
    next(error)
  }
};

exports.getFeedById = async (req, res, next) => {
  try {
    const feed = await Feed.findByPk(req.params.id);

    if (!feed) {
      return next(createError(404, 'Feed not found'));
    }

    return sendResponse(res, {
      message: 'Feed fetched successfully',
      data: feed,
    });
  } catch (error) {
    next(error)
  }
};

exports.createFeed = async (req, res, next) => {
  try {
    const newFeed = await Feed.create(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: 'Feed created successfully',
      data: newFeed,
    });
  } catch (error) {
    console.error('[POST /feeds] Error:', error.message)
    next(error)
  }
};

exports.updateFeed = async (req, res, next) => {
  try {
    const updateFeed = await Feed.update(req.body, {where: {id: req.params.id}});
    if (updateFeed === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Feed not found',
      });
    }

    const updatedFeed = await Feed.findByPk(req.params.id)
    sendResponse(res, {
      message: 'Feed updated successfully',
      data: updatedFeed,
    });
  } catch (error) {
    console.error(`[PUT /ponds/${req.params.id}] Error:`, error.message);
    next(error);
  }
};

exports.deleteFeed = async (req, res, next) => {
  try {
    const deletedFeed = await Feed.destroy({where: {id: req.params.id}});
    
    if (deletedFeed === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Feed not found',
      });
    }

    sendResponse(res, {
      message: 'Feed deleted successfully',
      data: deletedFeed,
    });
  } catch (error) {
    console.error(`[DELETE /feeds/${req.params.id}] Error:`, error.message);
    next(error);
  }
};
