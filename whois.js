module.exports = {
  name: 'whois',
  description: 'Get information about a user',
  async execute(message, args) {
    // Check if a user is mentioned or if a user ID is provided
    const user = message.mentions.users.first() ||
                 (args.length && await message.client.users.fetch(args[0]).catch(() => null)) ||
                 message.author;  // Default to the message author if no valid user is found

    // If user is not found, inform the user
    if (!user) {
      return message.reply("❌ - **Invalid user** ");
    }

    // Get user info
    message.reply(` - **Username:** ${user.username}\n - **Display Name:** ${user.displayName}\n - **ID:** ${user.id}\n - **Date of Creation:** ${user.createdAt}`);
  },
};
