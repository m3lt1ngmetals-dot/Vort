const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: String,
  guildId: String,
  balance: { type: Number, default: 0 },
  inventory: { type: Array, default: [] }
});

module.exports = mongoose.model("Economy", schema);
