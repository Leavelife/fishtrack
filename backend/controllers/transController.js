const Transaction = require('../models/transactionModel');
const sendResponse = require('../utils/sendResponse');

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.getAll();
    sendResponse(res, {
      message: 'All transaction records fetched successfully',
      data: transactions,
    });
  } catch (err) {
    console.error('[GET /transactions] Error:', err.message);
    next(err);
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.getById(req.params.id);
    if (!transaction) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Transaction not found',
      });
    }

    sendResponse(res, {
      message: 'Transaction fetched successfully',
      data: transaction,
    });
  } catch (err) {
    console.error(`[GET /transactions/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: 'Transaction created successfully',
      data: newTransaction,
    });
  } catch (err) {
    console.error('[POST /transactions] Error:', err.message);
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const updatedTransaction = await Transaction.update(req.params.id, req.body);
    if (!updatedTransaction) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Transaction not found',
      });
    }

    sendResponse(res, {
      message: 'Transaction updated successfully',
      data: updatedTransaction,
    });
  } catch (err) {
    console.error(`[PUT /transactions/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const deletedTransaction = await Transaction.delete(req.params.id);
    if (!deletedTransaction) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Transaction not found',
      });
    }

    sendResponse(res, {
      message: 'Transaction deleted successfully',
    });
  } catch (err) {
    console.error(`[DELETE /transactions/${req.params.id}] Error:`, err.message);
    next(err);
  }
};
