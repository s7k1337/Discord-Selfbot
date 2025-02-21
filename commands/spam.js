module.exports = {
    name: 'spam',
    description: 'Send a custom number of messages with a custom message',
    async execute(message, args) {
      // Check if the user has permission to send messages
      if (!message.guild.me.permissions.has('SEND_MESSAGES')) {
      }
  
      // Check if the user has provided valid arguments
      const numberOfMessages = parseInt(args[0], 10);
      const messageContent = args.slice(1).join(' ');
  
      // Validate input
      if (isNaN(numberOfMessages) || numberOfMessages <= 0) {
        return message.reply("❌ - **Invalid message number**");
      }
  
      if (!messageContent) {
        return message.reply("❌ - **Invalid message**");
      }
  
      // Send the specified number of messages
      for (let i = 0; i < numberOfMessages; i++) {
        try {
          await message.channel.send(messageContent);
          console.log(`Sent message: ${messageContent}`);
        } catch (error) {
          console.error("Failed to send message:", error);
          message.reply("❌ - **An error occurred**");
          break; // Stop if there is an error sending the messages
        }
      }
  
      message.reply(`✅ - **Finished sending ${numberOfMessages} messages**`);
    },
  };
  
