module.exports = {
    name: 'wrong-channel',
    description: 'Tells people to ask in a different channel and deletes their message. This deletes 2 messages, the one where you ping the bot and the one right above that.',
    aliases: ['diffch', 'different-channel'],
    usage: '++wrong-channel @username or user ID',
    example: '++wrong-channel @DudeThatsErin',
  inHelp: 'yes',
  userPerms: [''],
    botPerms: [''],
    execute(message, args) {
  
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if (!user) {
        message.react('❌')
        message.reply('You need to specificy a user via mention or the ID.');
        return;
      }
      else { 
        let usr = message.mentions.members.first();
        usr.send(`Hey, ${usr}!` + ' This isn\'t the correct channel for your question. Please check our channel list on the left and ask repost in a different channel. Thank you!');
      }
      message.channel.bulkDelete(2);
      message.channel.send(`📨 Hey, ${user} I just sent you a DM as your post is in the wrong channel! Please check it!`).catch(async err => {
				message.channel.send(`Hey ${user}, it looks like you have your DMs closed. So I am displaying the command here.`);
				message.channel.send(`Hey, ${user}!` + ' This isn\'t the correct channel for your question. Please check our channel list on the left and ask repost in a different channel. Thank you!');
			});;
    },
    
  };