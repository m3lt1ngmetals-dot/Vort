const Backup = require('../models/backup');

async function createBackup(guild) {
  const roles = guild.roles.cache.map(r => ({
    name: r.name,
    permissions: r.permissions.bitfield,
    position: r.position
  }));

  const channels = guild.channels.cache.map(c => ({
    name: c.name,
    type: c.type
  }));

  await Backup.create({
    guildId: guild.id,
    roles,
    channels
  });
}

module.exports = { createBackup };
