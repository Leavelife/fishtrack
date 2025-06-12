const express = require('express');
const router = express.Router();
const irrigationController = require('../controllers/irrigController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');

const validateRequest = require('../middleware/validateRequest');
const irrigationValidation = require('../validations/irrigValidation');

// Routes
router.get('/', irrigationController.getAllIrrigations);
router.get('/:id', irrigationController.getIrrigationById);

// middleware untuk route yang user harus login dulu
router.use(authenticateToken);

router.post('/', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(irrigationValidation),
    irrigationController.createIrrigation
);
router.put('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(irrigationValidation),
    irrigationController.updateIrrigation
);
router.delete('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    irrigationController.deleteIrrigation
);

module.exports = router;
