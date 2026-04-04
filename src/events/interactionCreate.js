module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    if (interaction.customId === "create_ticket") {
      const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ['ViewChannel']
          },
          {
            id: interaction.user.id,
            allow: ['ViewChannel', 'SendMessages']
          }
        ]
      });

      await interaction.reply({ content: `Created ${channel}`, ephemeral: true });
    }
  }
};
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    // CREATE
    if (interaction.customId === "create_ticket") {
      const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        permissionOverwrites: [
          { id: interaction.guild.id, deny: ['ViewChannel'] },
          { id: interaction.user.id, allow: ['ViewChannel', 'SendMessages'] }
        ]
      });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('close_ticket')
          .setLabel('Close Ticket')
          .setStyle(ButtonStyle.Danger)
      );

      await channel.send({
        content: "Support will be with you shortly.",
        components: [row]
      });

      return interaction.reply({ content: `Created ${channel}`, ephemeral: true });
    }

    // CLOSE
    if (interaction.customId === "close_ticket") {
      await interaction.reply("Closing ticket...");
      setTimeout(() => interaction.channel.delete(), 3000);
    }
  }
};
if (interaction.customId === "set_warns") {
  await interaction.reply({
    content: "Send format: 3 timeout, 5 kick, 7 ban",
    ephemeral: true
  });
}
