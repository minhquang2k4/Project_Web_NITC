const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  parts: [PartSchema]
});

const ChatHistorySchema = new mongoose.Schema({
  history: [MessageSchema],
  generationConfig: {
    maxOutputTokens: Number
  }
});
 
const chatHistory = mongoose.model('ChatHistory', ChatHistorySchema);

module.exports = chatHistory;
