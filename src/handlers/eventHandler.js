const fs = require('fs');

module.exports = (client) => {
  const files = fs.readdirSync('./src/events')
    .filter(f => f.endsWith('.js'));

  for (const file of files) {
    try {
      const event = require(`../events/${file}`);

      if (!event?.name || typeof event.execute !== "function") {
        console.warn(`[EVENT SKIP] ${file}`);
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
      console.error(`[EVENT FAIL] ${file}`, err);
    }
  }
};