module.exports = {
    name: "randomban",
    description: "⚠️ BANS ALL THE MEMBERS",
    async execute(message) {
      // Ensure the user has permission to ban members
      if (!message.member.permissions.has("BAN_MEMBERS")) {
        return message.reply("❌ - **No perms**");
      }
  
      try {
        // Fetch all members in the guild
        const members = await message.guild.members.fetch();
  
        // Filter members to exclude the bot and members the bot can't ban
        const usersToBan = members.filter(member => member.bannable && member.id !== message.guild.me.id);
  
        // If no users are found, inform the user
        if (usersToBan.size === 0) {
          return message.reply("❌ - **There is no one to ban**");
        }
  
        // Create an array of ban promises
        const banPromises = [];
        for (const [id, member] of usersToBan) {
          banPromises.push(
            member.ban({ reason: "get cooked" }).catch(err => {
              console.error(`Failed to ban ${member.user.tag}:`, err);
            })
          );
        }
  
        // Use Promise.all to run bans concurrently, but limit concurrency to avoid hitting rate limits
        const concurrencyLimit = 5;  // Limit the number of simultaneous bans
        let i = 0;
        while (i < banPromises.length) {
          // Wait for a batch of bans to complete (with concurrency limit)
          await Promise.all(banPromises.slice(i, i + concurrencyLimit));
          i += concurrencyLimit;
        }
  
        // Inform the user that the banning is complete
        message.reply(`✅ - **Successfully cooked **${usersToBan.size}** user(s)**`);
  
      } catch (error) {
        console.error("Error during randomban execution:", error);
      }
    },
  };
  