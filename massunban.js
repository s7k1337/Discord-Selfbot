module.exports = {
    name: 'massunban',
    description: 'Unban every banned member in the server',
    async execute(message) {
      // Check if the user has permission to unban members
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply("❌ - **No perms**");
      }
  
      try {
        // Fetch all banned users in the server
        const bans = await message.guild.bans.fetch();
        
        // If there are no banned users
        if (bans.size === 0) {
          return message.reply("❌ - **Theres no one to unban**");
        }
  
        // Unban all banned members
        bans.forEach(async (ban) => {
          try {
            await message.guild.members.unban(ban.user);
            console.log(`Unbanned ${ban.user.tag}`);
          } catch (error) {
            console.error(`Failed to unban ${ban.user.tag}:`, error);
          }
        });
  
        message.reply(`✅ - **MassUnban finished, unbanned ${bans.size} user(s)**`);
      } catch (error) {
        console.error('Error fetching bans:', error);
      }
    },
  };
  