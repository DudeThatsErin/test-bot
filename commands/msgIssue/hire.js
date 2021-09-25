module.exports = {
    name: 'requests',
    description: 'Refers people to the request-coders channel to hire someone.',
    aliases: ['hire', 'request-coders', 'rc'],
    usage: '++requests @username or user ID',
    example: '++requests @DudeThatsErin',
  inHelp: 'yes',
  userPerms: [''],
  botPerms: [''],
    execute(message, args) {
  
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if (!user) {
        message.react('❌')
        message.channel.send('You need to specificy a user via mention or the ID.');;
        return;
      }
      else { 
        let usr = message.mentions.members.first();
        message.channel.send(`Hey, ${usr}!` + ' It looks like you are requesting for someone to help you individually. This question is better answered at <#756992144170024991>. Please repost it there.');
      }
      message.channel.bulkDelete(1);
    },
    
  };