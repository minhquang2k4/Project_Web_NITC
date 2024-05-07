const express = require('express');
const router = express.Router();
const controller = require('../controller/library.controller.js');
const { route } = require('./auth.route.js');

router.get('/', controller.index);

router.get('/detail/:id/flashcard', controller.flashcard);

router.get('/detail/:id/quizze', controller.quizze);

router.get('/detail/:id', controller.detail);

router.delete('/detail/delete-lib/:id', controller.deleteLibrary);

router.delete('/detail/delete-word/:libID/:wordID', controller.deleteWord);

router.post('/detail/:id', controller.createWord);

router.get('/create', controller.create);

router.post('/create', controller.createLibrary);

module.exports = router;