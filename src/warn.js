const { warnUser } = require('../../services/moderationService');

module.exports = {
  name: "warn",
  async execute(message, args) {
    if (!message.member.permissions.has("ModerateMembers")) return;

    const user = message.mentions.users.first();
    if (!user) return message.reply("Mention a user.");

    const reason = args.slice(1).join(" ") || "No reason";

    const count = await warnUser(message.guild, user, message.author, reason);

    message.reply(`${user.tag} warned. Total warns: ${count}`);

    // ✅ DM user
    user.send(`You were warned in ${message.guild.name}: ${reason}`).catch(() => {});
  }
};
