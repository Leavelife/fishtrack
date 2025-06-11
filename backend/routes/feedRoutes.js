const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');


router.get('/', feedController.getAllFeeds);
router.get('/:id', feedController.getFeedById);

// middleware untuk route yang user harus login dulu
router.use(authenticateToken);

router.post('/', authorizeRoles('owner', 'karyawan'), feedController.createFeed);
router.put('/:id', authorizeRoles('owner', 'karyawan'), feedController.updateFeed);
router.delete('/:id', authorizeRoles('owner', 'karyawan'), feedController.deleteFeed);

module.exports = router;
