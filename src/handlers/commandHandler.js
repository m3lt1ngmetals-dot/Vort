const fs = require('fs');

module.exports = (client) => {
  const folders = fs.readdirSync('./src/commands');

  for (const folder of folders) {
    const files = fs.readdirSync(`./src/commands/${folder}`)
      .filter(f => f.endsWith('.js'));

    for (const file of files) {
      try {
        const command = require(`../commands/${folder}/${file}`);

        if (!command?.name || typeof command.execute !== "function") {
          console.warn(`[SKIP] ${file}`);
          continue;
        }

        client.commands.set(command.name, command);
        console.log(`[LOADED] ${command.name}`);

      } catch (err) {
        console.error(`[ERROR LOADING] ${file}`, err);
      }
    }
  }
};