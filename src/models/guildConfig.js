const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  guildId: String,
  antiSpam: Object,
  antiNuke: Object,
  whitelist: Object,
  logChannelId: String
});

module.exports = mongoose.model("GuildConfig", schema);
