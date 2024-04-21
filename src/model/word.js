const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = wordSchema;