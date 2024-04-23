const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wordSchema = require('./word.model.js');

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
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }],
    }
});


const Library = mongoose.model("Library", librarySchema);

module.exports = Library;