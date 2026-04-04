const { rebuild } = require('../../services/rebuildService');

module.exports = {
  name: "rebuild",
  async execute(message) {
    if (!message.member.permissions.has("Administrator")) return;

    await rebuild(message.guild);
    message.reply("Server rebuilt.");
  }
};
