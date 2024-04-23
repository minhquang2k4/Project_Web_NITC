const express = require('express');
const path = require('path');
const { requireAuth, checkUser } = require('../middleware/auth.middleware.js');
const route = express.Router();
const controller = require('../controller/auth.controller.js');

route.use('/auth', require('./auth.route.js'));

route.get('/', checkUser, (req, res) => {
  res.render('index', { user: res.locals.user });
});

route.use('/library',requireAuth, require('./library.route.js'));

route.use('/logout', controller.logout);

module.exports = route;