module.exports = {
  name: "kick",
  async execute(message, args) {
    if (!message.member.permissions.has("KickMembers")) return;

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    await member.kick();
    message.reply(`${member.user.tag} kicked.`);
  }
};
