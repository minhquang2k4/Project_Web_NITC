const express = require('express');
const path = require('path');
const route = express.Router();

route.use("/auth", require('./auth.route.js'));

route.get('/', (req, res) => {
  res.render('index');
});

route.use("/library", require('./library.route.js'));

module.exports = route;