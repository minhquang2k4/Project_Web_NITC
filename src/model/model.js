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
    work: {
        type: Array,
        required: true
    }
});

const accountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    library: {
        type: [librarySchema],
        required: true
    }
});
const account = mongoose.model("Account", accountSchema);

module.exports = { account };
