module.exports = {
  name: "ban",
  description: "Bans a user from the server with a reason.",
  async execute(message, args) {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply("❌ - **No ban perms**");
    }

    if (!args.length) {
      return message.reply("🔳 - **Mention someone**");
    }

    const user = message.mentions.users.first() || message.client.users.cache.get(args[0]);

    if (!user) {
      return message.reply("❌ - **Invalid user**");
    }

    const member = message.guild.members.cache.get(user.id);

    if (!member) {
      return message.reply("❌ - **User isn't here**");
    }

    const reason = args.slice(1).join(" ") || "No reason";

    try {
      await member.ban({ reason, days: 7 });
      message.reply(`✅ - **${user.username} is cooked**`);
    } catch (err) {
      console.error(err);
      message.reply("❌ - **Role Hierarchy**");
    }
  },
};
