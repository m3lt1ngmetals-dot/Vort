const actionMap = new Map();

module.exports = {
  name: "channelDelete",
  async execute(channel, client) {
    const logs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: 12 // CHANNEL_DELETE
    });

    const log = logs.entries.first();
    if (!log) return;

    const { executor } = log;
    if (!executor) return;

    const key = `${channel.guild.id}-${executor.id}`;

    if (!actionMap.has(key)) actionMap.set(key, []);
    const timestamps = actionMap.get(key);

    const now = Date.now();
    timestamps.push(now);

    const filtered = timestamps.filter(t => now - t < 10000);
    actionMap.set(key, filtered);

    if (filtered.length > 3) {
      const member = await channel.guild.members.fetch(executor.id).catch(() => null);
      if (!member) return;

      try {
        // remove roles
        await member.roles.set([]);

        // timeout
        await member.timeout(60 * 1000, "Anti-nuke triggered");

        // kick
        await member.kick("Anti-nuke");

        console.log(`Anti-nuke punished ${executor.tag}`);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
const isWhitelisted = require('../utils/isWhitelisted');

if (await isWhitelisted(member)) return;
