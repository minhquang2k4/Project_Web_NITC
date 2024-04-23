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
        type: String
    }
});

const Word = mongoose.model("Word", wordSchema);
module.exports = Word;