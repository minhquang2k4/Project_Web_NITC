const express = require('express');
const path = require('path');
const { requireAuth } = require('../middleware/auth.middleware.js');
const route = express.Router();

route.use("/auth", require('./auth.route.js'));

route.get('/', (req, res) => {
  res.render('index');
});

route.use("/library",requireAuth, require('./library.route.js'));

module.exports = route;