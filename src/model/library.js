const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wordSchema = require('./wordSchema');

const librarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    word: {
        type: [wordSchema],
        required: true
    },
});

module.exports = librarySchema;

