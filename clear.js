module.exports = {
  name: "clear",
  description: "Clears a specified number of messages from the channel it's typed in.",
  async execute(message, args) {
    // Check if the user has permission to manage messages
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply("❌ - **No perms**");
    }

    // Check if a valid number is provided
    if (!args[0] || isNaN(args[0])) {
      return message.reply("❌ - **Provide a number**");
    }

    const amount = parseInt(args[0]);

    // Ensure the number is between 1 and 100
    if (amount < 1 || amount > 100) {
      return message.reply("❌ - **You can only clear 1-100**");
    }

    try {
      // Fetch messages to delete
      const messages = await message.channel.messages.fetch({ limit: amount });

      // Loop through each message and delete with a 0.6s cooldown
      for (const msg of messages.values()) {
        try {
          await msg.delete();
        } catch (err) {
          console.error(`Error deleting message ${msg.id}:`, err);
          // Even if deletion fails, wait before proceeding
        }
        await new Promise(resolve => setTimeout(resolve, 600));  // 0.6s cooldown
      }

      // Send the success message without referencing the deleted message
      message.reply(`✅ - **Cleared ${amount} messages**`).catch(err => {
        console.error("Error sending reply:", err);  // Catch any error when sending reply
      });

    } catch (error) {
      console.error("❌ - **Error fetching messages:**", error);
      message.reply("❌ - **There was an error trying to clear the messages**");
    }
  },
};
