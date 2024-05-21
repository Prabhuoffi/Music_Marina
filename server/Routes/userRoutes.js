const express = require('express');
const { register, login, dashboard } = require('../Controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', auth, dashboard);

module.exports = router;
