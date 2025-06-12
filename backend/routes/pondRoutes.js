const express = require('express');
const router = express.Router();
const pondController = require('../controllers/pondController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');

const validateRequest = require('../middleware/validateRequest');
const pondValidation = require('../validations/pondValidation');

// GET boleh semua pengunjung
router.get('/', pondController.getAllPonds);
router.get('/:id', pondController.getPondById);

// middleware untuk route yang user harus login dulu
router.use(authenticateToken);

// POST, PUT, DELETE hanya untuk owner dan karyawan
router.post('/', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(pondValidation), 
    pondController.createPond
);
router.put('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(pondValidation), 
    pondController.updatePond
);
router.delete('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    pondController.deletePond
);

module.exports = router;
