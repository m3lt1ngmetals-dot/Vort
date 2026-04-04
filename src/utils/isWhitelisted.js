const GuildConfig = require('../models/guildConfig');

module.exports = async (member) => {
  const config = await GuildConfig.findOne({ guildId: member.guild.id });
  if (!config) return false;

  if (config.whitelist.users.includes(member.id)) return true;

  if (member.roles.cache.some(r => config.whitelist.roles.includes(r.id))) {
    return true;
  }

  return false;
};
