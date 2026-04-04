const Backup = require('../models/backup');

async function rebuild(guild) {
  const backup = await Backup.findOne({ guildId: guild.id }).sort({ createdAt: -1 });
  if (!backup) return;

  for (const role of backup.roles) {
    await guild.roles.create({
      name: role.name,
      permissions: role.permissions
    });
  }

  for (const channel of backup.channels) {
    await guild.channels.create({
      name: channel.name,
      type: channel.type
    });
  }
}

module.exports = { rebuild };
