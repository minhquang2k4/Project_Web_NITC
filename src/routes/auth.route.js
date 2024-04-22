const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller.js');

router.get('/login', controller.login);

router.get('/register', controller.register);

module.exports = router;