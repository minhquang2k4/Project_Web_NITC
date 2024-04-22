const express = require('express');
const router = express.Router();
const controller = require('../controller/library.controller.js');
const { route } = require('./auth.route.js');

router.get('/', controller.index);

router.get('/detail', controller.detail);

router.get('/create', controller.create);

router.get('/detail/flashcard', controller.flashcard);

router.get('/detail/quizze', controller.quizze);

module.exports = router;