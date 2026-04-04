const spamMap = new Map();

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    // ===== COMMAND HANDLER =====
    if (message.content.startsWith(client.prefix)) {
      const args = message.content.slice(client.prefix.length).split(/ +/);
      const cmd = args.shift().toLowerCase();

      const command = client.commands.get(cmd);
      if (command) command.execute(message, args);
    }

    // ===== ANTISPAM =====
    const userId = message.author.id;
    if (!spamMap.has(userId)) spamMap.set(userId, []);

    const timestamps = spamMap.get(userId);
    const now = Date.now();

    timestamps.push(now);

    // keep last 3 seconds
    spamMap.set(userId, timestamps.filter(t => now - t < 3000));

    if (timestamps.length > 5) {
      try {
        await message.member.timeout(10 * 1000, "Spam detected");
        message.channel.send(`${message.author.tag} muted for spam.`);
      } catch (err) {}
    }
  }
};
