const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const librarySchema = require('./library.model.js');

const accountSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    library: {
        type: [librarySchema],
    }
});

const account = mongoose.model("Account", accountSchema);
module.exports = account;