const GuildConfig = require('../../models/guildConfig');

module.exports = {
  name: "setup",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Admin only.");
    }

    const logChannel = message.mentions.channels.first();
    if (!logChannel) return message.reply("Mention a log channel.");

    let config = await GuildConfig.findOne({ guildId: message.guild.id });

    if (!config) {
      config = new GuildConfig({
        guildId: message.guild.id,
        logChannelId: logChannel.id,
        antiSpam: { enabled: true },
        antiNuke: { enabled: true }
      });
    } else {
      config.logChannelId = logChannel.id;
    }

    await config.save();

    message.reply("Setup complete.");
  }
};
