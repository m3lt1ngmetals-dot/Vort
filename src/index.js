const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// ===== GLOBAL ERROR HANDLING =====
process.on('unhandledRejection', (err) => {
  console.error('[UNHANDLED REJECTION]', err);
});

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
});

// ===== CLIENT =====
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

// ===== LOGGER (upgradeable later to Mongo) =====
client.logger = {
  info: (msg, meta = {}) => console.log('[INFO]', msg, meta),
  error: (msg, meta = {}) => console.error('[ERROR]', msg, meta),
};

// ===== DB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => client.logger.info("MongoDB connected"))
  .catch(err => client.logger.error("MongoDB error", { err }));

// ===== LOADERS =====
require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

// ===== LOGIN =====
client.login(process.env.TOKEN);