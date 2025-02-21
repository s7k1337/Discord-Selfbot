module.exports = {
    name: 'deletechannels',
    description: '⚠️ DELETES ALL CHANNELS REALLY FAST ',
    async execute(message) {
      // Check if the user has permission to manage channels
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply("❌ - **No perms**");
      }
  
      // Send a warning and ask for confirmation
      const confirmationMessage = await message.reply(
        "⚠️ - **By executing this command, you will delete every single channel in the server. Type YES if you are sure**"
      );
  
      // Filter messages to check for the confirmation response
      const filter = (response) => {
        return response.author.id === message.author.id && response.content.toLowerCase() === 'yes';
      };
  
      // Wait for confirmation
      try {
        const collected = await message.channel.awaitMessages({
          filter,
          max: 1,
          time: 30000, // 30 seconds for confirmation
          errors: ['time'],
        });
  
        // If the user confirmed, delete the channels
        if (collected.size > 0) {
          const channelsToDelete = [];
          message.guild.channels.cache.forEach(channel => {
            // Add channels that are deletable (text, voice, stage, category)
            if (channel.deletable) {
              channelsToDelete.push(channel);
            }
          });
  
          // If no deletable channels are found
          if (channelsToDelete.length === 0) {
            return message.reply("❌ - **No deletable channels found**");
          }
  
          // Delete channels without further messaging
          for (const channel of channelsToDelete) {
            try {
              await channel.delete();
              console.log(`Deleted channel: ${channel.name}`);
            } catch (error) {
              console.error(`Failed to delete channel ${channel.name}:`, error);
            }
          }
  
          // No message sent after deletion (only proceed with deletion)
        } else {
        }
      } catch (err) {
      }
    },
  };
  
