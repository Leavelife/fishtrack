const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const validateRequest = require('../middleware/validateRequest')
const { registerSchema } = require('../validations/authValidation')

router.post('/refresh-token', authController.refreshToken);
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/google-login', authController.googleLogin);
router.post('/firebase-login', authController.firebaseLogin);
router.post('/logout', authController.logout)

module.exports = router;

