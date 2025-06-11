const express = require('express');
const router = express.Router();
const { ubahRoleUser } = require('../controllers/roleController');
const authenticateToken = require('../middleware/authToken');
const authorizeRoles = require('../middleware/authorizeRole');

// Hanya OWNER yang boleh ubah role user
router.put('/ubah-role', authenticateToken, authorizeRoles('owner'), ubahRoleUser);

module.exports = router;
