module.exports = {
    name: 'ltc',
    description: 'Sends your ltc addy',
    execute(message) {
      // Reply with the value of 'ltc' from the .env file
      const ltcValue = process.env.ltc;
      if (ltcValue) {
        message.reply(ltcValue);
      } else {
        message.reply('❌ - **No LTC Address found in .env**');
      }
    },
  };
  