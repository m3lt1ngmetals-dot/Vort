module.exports = {
  name: "clear",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) return;

    let amount = parseInt(args[0]);
    if (!amount) return message.reply("Enter amount.");

    while (amount > 0) {
      const toDelete = Math.min(amount, 100);

      const msgs = await message.channel.bulkDelete(toDelete, true);
      amount -= msgs.size;

      if (msgs.size < 100) break;
    }

    message.channel.send("Cleared messages.").then(m => {
      setTimeout(() => m.delete(), 3000);
    });
  }
};
