const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const validateRequest = require('../middleware/validateRequest')
const { registerSchema, loginSchema } = require('../validations/authValidation')

router.post('/refresh-token', authController.refreshToken);
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/logout', authController.logout)

module.exports = router;
