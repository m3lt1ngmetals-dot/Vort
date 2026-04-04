const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ GLOBAL ERROR HANDLER
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

;const client = new Client({
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

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Handlers
require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

client.login(process.env.TOKEN);
