const express = require('express');
const router = express.Router();
const harvestController = require('../controllers/harvestController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');

router.get('/', harvestController.getAllHarvests);
router.get('/:id', harvestController.getHarvestById);

// middleware untuk route yang user harus login dulu
router.use(authenticateToken);

router.post('/', authorizeRoles('owner', 'karyawan'), harvestController.createHarvest);
router.put('/:id', authorizeRoles('owner', 'karyawan'), harvestController.updateHarvest);
router.delete('/:id', authorizeRoles('owner', 'karyawan'), harvestController.deleteHarvest);

module.exports = router;
