const Moderation = require('../models/moderation');
const GuildConfig = require('../models/guildConfig');

module.exports.warnUser = async (guild, user, moderator, reason) => {
  let data = await Moderation.findOne({ guildId: guild.id, userId: user.id });

  if (!data) {
    data = await Moderation.create({
      guildId: guild.id,
      userId: user.id,
      warnings: []
    });
  }

  data.warnings.push({
    reason,
    moderatorId: moderator.id,
    date: Date.now()
  });

  const config = await GuildConfig.findOne({ guildId: guild.id });

  const warnExpiry = config?.moderation?.warnExpiry ?? 0;
  const punishments = config?.moderation?.warnPunishments ?? [];

  // EXPIRY FILTER
  if (warnExpiry > 0) {
    const cutoff = Date.now() - (warnExpiry * 86400000);
    data.warnings = data.warnings.filter(w => w.date > cutoff);
  }

  await data.save();

  const warnCount = data.warnings.length;

  // AUTO PUNISH
  for (const p of punishments) {
    if (warnCount === p.count) {
      const member = await guild.members.fetch(user.id).catch(() => null);
      if (!member) return warnCount;

      try {
        if (p.action === "timeout") {
          await member.timeout(10 * 60 * 1000);
        }

        if (p.action === "kick") {
          await member.kick();
        }

        if (p.action === "ban") {
          await member.ban();
        }

      } catch (err) {
        console.log("Punishment error:", err);
      }
    }
  }

  return warnCount;
};
