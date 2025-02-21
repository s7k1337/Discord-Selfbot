module.exports = {
  name: "calc",
  description: "Some basic calculations.",
  execute(message, args) {
    if (args.length === 0) {
      return message.reply("🔳 - Provide a math task (e.g., `!calc 2.4 x 5`)");
    }

    const expression = args.join(" ").toLowerCase()
      .replace(/x/g, '*')    // Replace "x" with "*" (multiplication)
      .replace(/÷/g, '/')    // Replace "÷" with "/" (division)
      .replace(/ /g, '')     // Remove spaces between numbers
      .replace(/[^0-9+\-*/().]/g, ''); // Remove invalid characters

    try {
      const result = eval(expression);
      if (isNaN(result) || result === Infinity || result === -Infinity) {
        throw new Error("❌ - **Invalid calculation**");
      }

      message.reply(`✅ - Your result is: ${result}`);
    } catch (error) {
      message.reply("❌ - **Invalid Syntax**");
    }
  },
};
