const Economy = require('../../models/economy');

module.exports = {
  name: "balance",
  async execute(message) {
    let user = await Economy.findOne({
      userId: message.author.id,
      guildId: message.guild.id
    });

    if (!user) {
      user = await Economy.create({
        userId: message.author.id,
        guildId: message.guild.id
      });
    }

    message.reply(`Balance: ${user.balance}`);
  }
};
