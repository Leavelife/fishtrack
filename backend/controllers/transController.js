const Transaction = require('../models/transactionModel');
const sendResponse = require('../utils/sendResponse');

// GET ALL
exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    sendResponse(res, {
      message: 'All transaction records fetched successfully',
      data: transactions,
    });
  } catch (err) {
    console.error('[GET /transactions] Error:', err.message);
    next(err);
  }
};

// GET BY ID
exports.getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
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

// CREATE
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

// UPDATE
exports.updateTransaction = async (req, res, next) => {
  try {
    const [updatedRows] = await Transaction.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Transaction not found',
      });
    }

    const updatedTransaction = await Transaction.findByPk(req.params.id);
    sendResponse(res, {
      message: 'Transaction updated successfully',
      data: updatedTransaction,
    });
  } catch (err) {
    console.error(`[PUT /transactions/${req.params.id}] Error:`, err.message);
    next(err);
  }
};

// DELETE
exports.deleteTransaction = async (req, res, next) => {
  try {
    const deletedRows = await Transaction.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0) {
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
