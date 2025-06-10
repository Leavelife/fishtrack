const express = require('express');
const router = express.Router();
const pondController = require('../controllers/pondController');

router.get('/', pondController.getAllPonds);
router.get('/:id', pondController.getPondById);

router.post('/', pondController.createPond);

router.put('/:id', pondController.updatePond);

router.delete('/:id', pondController.deletePond);

module.exports = router;
