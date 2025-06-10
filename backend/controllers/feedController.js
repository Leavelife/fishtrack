const Feed = require('../models/feedModel');
const createError =  require('http-errors')
const sendResponse = require('../utils/sendResponse')

exports.getAllFeeds = async (req, res, next) => {
  try {
    const feeds = await Feed.getAll();
    
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
    const { id } = req.params;
    const feed = await Feed.getById(id);

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
    const updatedFeed = await Feed.update(req.params.id, req.body);
    if (!updatedFeed) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Feed not found',
      });
    }

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
    const deletedFeed = await Feed.delete(req.params.id);
    
    if (!deletedFeed) {
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
