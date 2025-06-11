const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);

// middleware untuk route yang user harus login dulu
router.use(authenticateToken);

router.post('/', authorizeRoles('owner', 'karyawan'), transactionController.createTransaction);
router.put('/:id', authorizeRoles('owner', 'karyawan'), transactionController.updateTransaction);
router.delete('/:id', authorizeRoles('owner', 'karyawan'), transactionController.deleteTransaction);

module.exports = router;
