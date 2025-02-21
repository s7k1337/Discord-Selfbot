const { Client, GatewayIntentBits } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Create a new client instance with necessary intents (including for handling commands)
const client = new Client({
});

// Create a collection to store commands
client.commands = new Map();

// Load commands dynamically from the 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', file));
  client.commands.set(command.name, command);
}

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log('Made by https://github.com/s7k1337 | Selfbot is running <3');
});

// Event listener for handling incoming messages
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore messages from other bots

  // Ensure the message starts with '!' (or your desired prefix)
  if (!message.content.startsWith('!')) return;

  // Extract the command name and arguments
  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Check if the command exists
  if (client.commands.has(commandName)) {
    const command = client.commands.get(commandName);
    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
    }
  }
});

// Login to Discord using the bot token from the .env file
client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error("Error logging in:", err);
});
