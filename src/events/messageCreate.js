const spamMap = new Map();

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    try {
      if (message.author.bot || !message.guild) return;

      // ===== COMMAND ROUTER ONLY =====
      if (message.content.startsWith(client.prefix)) {
        const args = message.content
          .slice(client.prefix.length)
          .trim()
          .split(/ +/);

        const cmd = args.shift()?.toLowerCase();
        if (!cmd) return;

        const command = client.commands.get(cmd);
        if (!command) return;

        try {
          await command.execute(message, args);
        } catch (err) {
          console.error(`[COMMAND ERROR] ${cmd}`, err);
          await message.reply("Command failed.");
        }

        return; // ✅ PREVENT DOUBLE EXECUTION
      }

      // ===== ANTISPAM =====
      const userId = message.author.id;
      if (!spamMap.has(userId)) spamMap.set(userId, []);

      const now = Date.now();
      const timestamps = spamMap.get(userId).filter(t => now - t < 3000);

      timestamps.push(now);
      spamMap.set(userId, timestamps);

      if (timestamps.length > 5) {
        try {
          await message.member.timeout(10 * 1000, "Spam detected");
          await message.channel.send(`${message.author.tag} muted for spam.`);
        } catch (err) {
          console.error("[ANTISPAM ERROR]", err);
        }
      }

    } catch (err) {
      console.error("[MESSAGE ERROR]", err);
    }
  }
};