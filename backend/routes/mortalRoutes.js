const express = require('express');
const router = express.Router();
const mortalitiesController = require('../controllers/mortalController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');

const validateRequest = require('../middleware/validateRequest');
const mortalityValidation = require('../validations/mortalValidation');
const mortalitySchema = require('../validations/mortalValidation');

router.get('/', mortalitiesController.getAllMortalities);
router.get('/:id', mortalitiesController.getMortalityById);

// middleware untuk route yang user harus login dulu
router.use(authenticateToken);

router.post('/', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(mortalitySchema),
    mortalitiesController.createMortality
);
router.put('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    validateRequest(mortalitySchema),
    mortalitiesController.updateMortality
);
router.delete('/:id', 
    authorizeRoles('owner', 'karyawan'), 
    mortalitiesController.deleteMortality
);

module.exports = router;
