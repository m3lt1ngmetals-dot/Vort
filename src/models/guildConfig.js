const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true },

  antiSpam: {
    enabled: { type: Boolean, default: true },
    messageLimit: { type: Number, default: 5 },
    interval: { type: Number, default: 3000 }
  },

  antiNuke: {
    enabled: { type: Boolean, default: true },
    channelDeleteLimit: { type: Number, default: 3 },
    roleDeleteLimit: { type: Number, default: 3 },
    timeWindow: { type: Number, default: 10000 }
  },

  whitelist: {
    users: { type: [String], default: [] },
    roles: { type: [String], default: [] }
  },

  logChannelId: { type: String }
});

module.exports = mongoose.model('GuildConfig', guildConfigSchema);
moderation: {
  warnPunishments: [
    {
      count: Number,
      action: String
    }
  ]
}
