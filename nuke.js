module.exports = {
  name: 'nuke',
  description: 'Clones the channel and deletes the original one',
  async execute(message) {
    const channel = message.channel;

    try {
      // Clone the channel
      const clonedChannel = await channel.clone();

      // Delete the original channel
      await channel.delete();

      // Send a message to the newly cloned channel
      clonedChannel.send('✅ - Nuked by ' + message.author.tag)
        .then(() => {
          // Optional: You can also set the topic or change the name of the cloned channel here if needed
          clonedChannel.setName(`${channel.name}-`);
        })
        .catch(err => {
          console.error('Error sending message to cloned channel:', err);
        });
    } catch (error) {
      console.error('Error nuking the channel:', error);
    }
  },
};
