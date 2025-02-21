module.exports = {
    name: 'spamchannels',
    description: 'Create a specified number of channels with a custom name',
    async execute(message, args) {
      // Check if the user has permission to manage channels
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply("❌ - **No perms**");
      }
  
      // Parse the number of channels to create
      const numberOfChannels = parseInt(args[0], 10);
      const channelName = args[1];
  
      // Validate input
      if (isNaN(numberOfChannels) || numberOfChannels <= 0) {
        return message.reply("❌ - **Provide a valid number**");
      }
  
      if (!channelName) {
        return message.reply("❌ - **Provide a name**");
      }
  
      // Create the specified number of channels
      for (let i = 1; i <= numberOfChannels; i++) {
        try {
          // Create a new text channel with the specified name
          const newChannel = await message.guild.channels.create(`${channelName}-${i}`, {
            type: 'GUILD_TEXT',  // Ensure it's a text channel
          });
  
          console.log(`Created channel: ${newChannel.name}`);
        } catch (error) {
          console.error(`Failed to create channel: ${channelName}-${i}`, error);
        }
      }
  
      message.reply(`✅ - **Succesfully cooked ${numberOfChannels} channels**`);
    },
  };
  
