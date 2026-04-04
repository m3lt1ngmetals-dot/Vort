const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// =======================
// GLOBAL ERROR HANDLING
// =======================

// Handles async promise failures
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection]', reason);
});

// Handles sync crashes (IMPORTANT: you were missing this)
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]', err);
});

// =======================
// CLIENT SETUP
// =======================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();
client.prefix = "?";

// =======================
// SIMPLE LOGGER WRAPPER (MVP)
// =======================

client.logger = {
  info: (msg, meta = {}) => console.log('[INFO]', msg, meta),
  warn: (msg, meta = {}) => console.warn('[WARN]', msg, meta),
  error: (msg, meta = {}) => console.error('[ERROR]', msg, meta),
};

// =======================
// MONGODB CONNECTION
// =======================

mongoose.connect(process.env.MONGO_URI)
  .then(() => client.logger.info("MongoDB connected"))
  .catch(err => client.logger.error("MongoDB connection failed", { err }));

// =======================
// HANDLERS
// =======================

try {
  require('./handlers/commandHandler')(client);
  require('./handlers/eventHandler')(client);

  client.logger.info("Handlers loaded successfully");
} catch (err) {
  client.logger.error("Handler load failure (likely syntax error in command)", {
    err: err.stack || err
  });
}

// =======================
// LOGIN
// =======================

client.login(process.env.TOKEN)
  .then(() => client.logger.info("Bot logged in"))
  .catch(err => client.logger.error("Login failed", { err }));
