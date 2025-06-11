const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authToken');

router.get('/', authenticateToken, (req, res) => {
  res.json({
    message: `Welcome back, ${req.user.name}!`,
    user: req.user
  });
});

module.exports = router;
