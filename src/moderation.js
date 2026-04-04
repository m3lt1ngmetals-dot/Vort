const mongoose = require('mongoose');

const moderationSchema = new mongoose.Schema({
  guildId: String,
  userId: String,
  warnings: [
    {
      reason: String,
      moderatorId: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Moderation', moderationSchema);
