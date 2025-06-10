const express = require('express');
const router = express.Router();
const irrigationController = require('../controllers/irrigController');

// Routes
router.get('/', irrigationController.getAllIrrigations);
router.get('/:id', irrigationController.getIrrigationById);
router.post('/', irrigationController.createIrrigation);
router.put('/:id', irrigationController.updateIrrigation);
router.delete('/:id', irrigationController.deleteIrrigation);

module.exports = router;
