module.exports = {
  name: "ping",
  description: "Check the bot's ping",
  execute(message) {
    const ping = Date.now() - message.createdTimestamp;
    message.reply(`🏓 - **The bot has** _${ping}ms_`);
  },
};
