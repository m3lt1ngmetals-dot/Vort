const Moderation = require('../../models/moderation');

module.exports = {
  name: "warnings",
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return;

    const data = await Moderation.findOne({
      guildId: message.guild.id,
      userId: user.id
    });

    if (!data || data.warnings.length === 0)
      return message.reply("No warnings.");

    message.reply(`Warnings: ${data.warnings.length}`);
  }
};
