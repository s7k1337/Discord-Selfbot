const fs = require('fs');
const statusesPath = './statuses.json'; // Path to the statuses file

module.exports = {
  name: 'status',
  description: 'Toggle the bot status rotation on/off',
  async execute(message, args, client) {
    let statusEnabled = true;
    let statusInterval = null;
    let statusIndex = 0;  // To keep track of which status to show

    // Load the statuses from statuses.json
    let statuses = [];
    try {
      statuses = JSON.parse(fs.readFileSync(statusesPath, 'utf-8')).statuses;
    } catch (error) {
      console.error('Error reading or parsing statuses.json:', error);
    }

    // If statuses.json is empty, disable status rotation
    if (!statuses || statuses.length === 0) {
      console.log('No valid statuses found. Status rotation will not be active.');
      statusEnabled = false;
    }

    // Check the command arguments to toggle status rotation
    if (args[0] === 'off' || args[0] === 'disable') {
      statusEnabled = false;
      message.reply('❌ - **Status rotation is now OFF**');
    } else if (args[0] === 'on' || args[0] === 'enable') {
      statusEnabled = true;
      message.reply('✅ - **Status rotation is now ON**');
    }

    // Function to start status rotation
    const startStatusRotation = () => {
      if (statusInterval) return; // If already rotating, don't start again
      statusInterval = setInterval(() => {
        if (!statusEnabled) {
          clearInterval(statusInterval); // Stop if the status is turned off
          return;
        }

        const currentStatus = statuses[statusIndex];
        client.user.setPresence({
          status: currentStatus.activity, // online, idle, dnd, or invisible
          activities: [
            {
              name: currentStatus.status, // Custom status text
              type: currentStatus.type, // Activity type like PLAYING, WATCHING, LISTENING, etc.
              assets: {
                large_image: currentStatus.image ? currentStatus.image : null // If there is an image, use it
              }
            }
          ]
        });

        // Increment index and wrap around using modulo
        statusIndex = (statusIndex + 1) % statuses.length;
      }, 15000);  // 15 seconds
    };

    // Start status rotation if enabled
    if (statusEnabled) {
      startStatusRotation();
    } else {
      // If status is turned off, set the bot presence to invisible
      client.user.setPresence({
        status: 'invisible',  // No visible status
        activities: []        // No activity
      });
    }
  },
};
