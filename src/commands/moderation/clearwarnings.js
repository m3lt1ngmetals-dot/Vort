const Moderation = require('../../models/moderation');

module.exports = {
  name: "clearwarnings",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) return;

    const user = message.mentions.users.first();
    if (!user) return;

    await Moderation.deleteOne({
      guildId: message.guild.id,
      userId: user.id
    });

    message.reply("Warnings cleared.");
  }
};
