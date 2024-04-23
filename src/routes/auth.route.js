const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller.js');

router.get('/login', controller.login);

router.get('/register', controller.register);

router.post('/login', controller.postLogin);

router.post('/register', controller.postRegister);

module.exports = router;