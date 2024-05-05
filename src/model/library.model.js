const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wordSchema = require('./word.model.js');
const chatHistory = require('./chat.model.js');

const librarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    word: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }],
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'ChatHistory'
    },
});


const Library = mongoose.model("Library", librarySchema);

module.exports = Library;