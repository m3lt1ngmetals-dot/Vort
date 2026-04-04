const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  guildId: String,
  roles: Array,
  channels: Array
}, { timestamps: true });

module.exports = mongoose.model("Backup", schema);
