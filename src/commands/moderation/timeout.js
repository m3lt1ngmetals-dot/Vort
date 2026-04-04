module.exports = {
  name: "timeout",
  async execute(message, args) {
    if (!message.member.permissions.has("ModerateMembers")) return;

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    const time = parseInt(args[1]) || 60;

    await member.timeout(time * 1000);
    message.reply(`${member.user.tag} timed out for ${time}s.`);
  }
};
