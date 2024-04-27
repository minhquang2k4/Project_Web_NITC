const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  history: [
    {
      role: String,
      parts: [
        {
          text: String
        }
      ]
    }
  ],
  generationConfig: {
    maxOutputTokens: Number
  }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;