const express = require('express');
const router = express.Router();
const harvestController = require('../controllers/harvestController');

router.get('/', harvestController.getAllHarvests);
router.get('/:id', harvestController.getHarvestById);

router.post('/', harvestController.createHarvest);

router.put('/:id', harvestController.updateHarvest);

router.delete('/:id', harvestController.deleteHarvest);

module.exports = router;
