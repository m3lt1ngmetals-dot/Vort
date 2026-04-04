const Economy = require('../../models/economy');

module.exports = {
  name: "daily",
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

    user.balance += 500;
    await user.save();

    message.reply("You got 500 coins!");
  }
};
