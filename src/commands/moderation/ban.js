module.exports = {
  name: "ban",
  async execute(message, args) {
    if (!message.member.permissions.has("BanMembers")) return;

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    await member.ban();
    message.reply(`${member.user.tag} banned.`);
  }
};
