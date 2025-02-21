module.exports = {
    name: 'cmds',
    description: 'List all available commands',
    async execute(message) {
      // Load all the commands dynamically from the commands folder
      const commands = message.client.commands;
  
      // Create a string to list all commands
      let commandList = 'Here are all the available commands:\n';
  
      commands.forEach(command => {
        commandList += `**${command.name}** - ${command.description}\n`;
      });
  
      // If the list is too long, split it into chunks of 2000 characters
      const chunkSize = 2000;
      if (commandList.length > chunkSize) {
        for (let i = 0; i < commandList.length; i += chunkSize) {
          message.reply(commandList.substring(i, i + chunkSize));
        }
      } else {
        message.reply(commandList);
      }
    },
  };
  