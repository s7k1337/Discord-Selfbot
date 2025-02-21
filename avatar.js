module.exports = {
  name: 'avatar',
  description: 'Get the avatar of a user',
  async execute(message, args) {
    // Check if a user is mentioned or if a user ID is provided
    const user = message.mentions.users.first() ||
                 (args.length && await message.client.users.fetch(args[0]).catch(() => null)) ||
                 message.author;  // Default to the message author if no valid user is found

    // If user is not found, inform the user
    if (!user) {
      return message.reply("❌ - **Invalid user**");
    }

    // Get user avatar URL
    message.reply(user.displayAvatarURL({ dynamic: true, size: 1024 }));
  },
};