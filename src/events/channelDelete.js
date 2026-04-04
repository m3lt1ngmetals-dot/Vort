const actionMap = new Map();
const GuildConfig = require('../models/guildConfig');
const isWhitelisted = require('../utils/isWhitelisted');

module.exports = {
  name: "channelDelete",
  async execute(channel) {
    const guild = channel.guild;

    const logs = await guild.fetchAuditLogs({
      limit: 1,
      type: 12 // CHANNEL_DELETE
    });

    const log = logs.entries.first();
    if (!log) return;

    const { executor } = log;
    if (!executor) return;

    const member = await guild.members.fetch(executor.id).catch(() => null);
    if (!member) return;

    // ✅ WHITELIST CHECK
    if (await isWhitelisted(member)) return;

    const key = `${guild.id}-${executor.id}`;

    if (!actionMap.has(key)) actionMap.set(key, []);
    const timestamps = actionMap.get(key);

    const now = Date.now();
    timestamps.push(now);

    const filtered = timestamps.filter(t => now - t < 10000);
    actionMap.set(key, filtered);

    if (filtered.length > 3) {
      try {
        await member.roles.set([]);
        await member.timeout(60 * 1000, "Anti-nuke triggered");
        await member.kick("Anti-nuke");

        // ✅ SAFE LOGGING
        const config = await GuildConfig.findOne({ guildId: guild.id });
        if (config?.logChannelId) {
          const logChannel = guild.channels.cache.get(config.logChannelId);
          logChannel?.send(`🚨 Anti-nuke: ${executor.tag}`);
        }

      } catch (err) {
        console.log("Anti-nuke error:", err);
      }
    }
  }
};
