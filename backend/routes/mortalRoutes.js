const express = require('express');
const router = express.Router();
const mortalitiesController = require('../controllers/mortalController');

router.get('/', mortalitiesController.getAllMortalities);
router.get('/:id', mortalitiesController.getMortalityById);

router.post('/', mortalitiesController.createMortality);

router.put('/:id', mortalitiesController.updateMortality);

router.delete('/:id', mortalitiesController.deleteMortality);

module.exports = router;
