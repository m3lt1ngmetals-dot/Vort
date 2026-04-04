const Economy = require('../../models/economy');

module.exports = {
  name: "buy",
  async execute(message, args) {
    const item = args[0];
    if (!item) return;

    let user = await Economy.findOne({
      userId: message.author.id,
      guildId: message.guild.id
    });

    if (!user || user.balance < 500) {
      return message.reply("Not enough money.");
    }

    user.balance -= 500;
    user.inventory.push(item);

    await user.save();

    message.reply(`Bought ${item}`);
  }
};
