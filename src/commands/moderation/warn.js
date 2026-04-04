const { warnUser } = require('../../services/moderationService');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: "warn",

  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return;

    const user = message.mentions.users.first();
    if (!user) return message.reply("Mention a user.");

    const reason = args.slice(1).join(" ") || "No reason";

    try {
      const count = await warnUser(
        message.guild,
        user,
        message.author,
        reason
      );

      await message.reply(`${user.tag} warned. Total warns: ${count}`);

      // DM user safely
      user.send(`You were warned in ${message.guild.name}: ${reason}`)
        .catch(() => {
          message.channel.send("⚠️ Could not DM user.");
        });

    } catch (err) {
      console.error("Warn command failed:", err);
      message.reply("Failed to warn user.");
    }
  }
};
