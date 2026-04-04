const spamMap = new Map();

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    try {
      if (message.author.bot || !message.guild) return;

      // ===== COMMAND HANDLER =====
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
          message.reply("Command failed.");
        }
      }

      // ===== ANTISPAM =====
      const userId = message.author.id;
      if (!spamMap.has(userId)) spamMap.set(userId, []);

      const timestamps = spamMap.get(userId);
      const now = Date.now();

      timestamps.push(now);

      const filtered = timestamps.filter(t => now - t < 3000);
      spamMap.set(userId, filtered);

      if (filtered.length > 5) {
        try {
          await message.member.timeout(10 * 1000, "Spam detected");
          message.channel.send(`${message.author.tag} muted for spam.`);
        } catch (err) {
          console.error("[ANTISPAM ERROR]", err);
        }
      }

    } catch (err) {
      console.error("[MESSAGE CREATE CRASH]", err);
    }
  }
};
