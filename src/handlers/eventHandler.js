const fs = require('fs');

module.exports = (client) => {
  const eventFiles = fs.readdirSync('./src/events')
    .filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    try {
      const event = require(`../events/${file}`);

      if (!event?.name || typeof event.execute !== "function") {
        console.warn(`[EVENT SKIP] Invalid event file: ${file}`);
        continue;
      }

      client.on(event.name, (...args) => {
        try {
          event.execute(...args, client);
        } catch (err) {
          console.error(`[EVENT ERROR] ${file}`, err);
        }
      });

      console.log(`[EVENT LOADED] ${event.name}`);

    } catch (err) {
      console.error(`[EVENT LOAD FAILED] ${file}`, err);
    }
  }
};
