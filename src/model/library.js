const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: [String],
        required: true
    },
});

module.exports = librarySchema;

