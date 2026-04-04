const fs = require('fs');

module.exports = (client) => {
  const commandFolders = fs.readdirSync('./src/commands');

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./src/commands/${folder}`)
      .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      try {
        const command = require(`../commands/${folder}/${file}`);

        if (!command?.name || typeof command.execute !== "function") {
          console.warn(`[COMMAND SKIP] Invalid command in ${file}`);
          continue;
        }

        client.commands.set(command.name, command);
        console.log(`[COMMAND LOADED] ${command.name}`);

      } catch (err) {
        console.error(`[COMMAND ERROR] ${file}`, err);
      }
    }
  }

  console.log(`[COMMAND SYSTEM] Loaded ${client.commands.size} commands`);
};
