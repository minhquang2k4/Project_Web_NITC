const express = require('express');
const path = require('path');
const { requireAuth, checkUser } = require('../middleware/auth.middleware.js');
const router = express.Router();
const controller = require('../controller/auth.controller.js');

router.use('/auth', require('./auth.route.js'));


router.get('/', checkUser, (req, res) => {
  res.render('index', { user: res.locals.user });
});


router.use('/library',requireAuth, require('./library.route.js'));


router.get('/logout', controller.logout);

module.exports = router;