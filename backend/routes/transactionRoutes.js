const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');
//middleware untuk set validasi input
const validateRequest = require('../middleware/validateRequest');
const transactionSchema = require('../validations/transValidation');

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);

// middleware untuk route yang user harus login dulu
router.use(authenticateToken);

router.post('/', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(transactionSchema), 
    transactionController.createTransaction
);
router.put('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(transactionSchema), 
    transactionController.updateTransaction
);
router.delete('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    transactionController.deleteTransaction
);

module.exports = router;
