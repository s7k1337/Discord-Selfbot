# 💗 Discord SelfBot

🤖 - A simple Discord selfbot made in NodeJS with couple of commands that could be found useful for someone. Made with <3

## Features

- `!ping`: Responds with bots ping latency.
- `!avatar <user>`: Returns the avatar of the mentioned user or just your accounts avatar.
- `!whois <user>`: Provides information about the mentioned user.
- `!ban <user>`: Bans the mentioned user.
- `!randomban`: Scrapes all the user IDS of the server it was triggered in, then starts banning members until everyone is banned.
- `!clear <number>`: Clears a specified number of messages.
- `!cmds`: Lists all available commands.
- `!status`: Toggles your custom rich presence.
- `!spamchannels <number> <name>`: Creates a specified number of channels with a custom name.
- `!spam <number> <message>`: Sends a specified number of messages with custom content.
- `!deletechannels`: Deletes all deletable channels.
- `!ltc`: Responds with your LTC address from the `.env` file.
- `!nuke`: Clones a channel and deletes the original.
- `!massunban`: Unbans all banned users.
- `!calc <number> <math_symbol> <number>`: Solves a simple math task for you.

## Prerequisites

Before running the bot, make sure you have the following:

- **Node.js**: Ensure Node.js is installed on your system. [Download Node.js here](https://nodejs.org/).
- **.env file**: Create `.env` file in your directory to store necessary information needed.

## Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/s7k1337/discord-selfbot.git
    cd discord-selfbot
    ```

2. **Install dependencies**:

    Run the setup.bat file to download all the required modules to run the selfbot.

3. **Create a `.env` file**:

    Create a `.env` file in the root of the project with the following content:

    ```
    DISCORD_TOKEN=YOUR_TOKEN
    PREFIX=PREFIX
    WHITELISTED_USER_ID=YOUR_ID
    LTC=YOUR_ADDY
    ```

4. **Run the selfbot**:

    After everything is set up, you can start the selfbot by running the start.bat file.


5. **Optional: Fill `status.json`** (for the `!status` command):

    If you want to use the custom rich presence function, fill the `statuses.json` file located in commands folder properly with all the informaton needed.

    ```json
    {
      "statuses": [
        {
          "status": "Playing Game",
          "activity": "online",
          "type": "PLAYING",
          "image": "https://example.com/image.png"
        }
      ]
    }
    ```

## Usage

- To interact with the bot, just mention it and use the available commands.
- For example, to check the selfbot's status: `!ping`.
- For more commands, use `!cmds` to list all available commands.

## Contributing

Feel free to DM me on discord if you face any issues!
