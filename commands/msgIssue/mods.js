module.exports = {
    name: 'mods',
    description: 'Refers people to Modmail bot.',
    aliases: ['modmail', 'mod'],
    usage: '++mods @username or user ID',
    example: '++mods @DudeThatsErin',
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
        usr.send(`Hey, ${usr}!` + ' Rule 4 states: Please do not ping or message the mods directly. If you would like to contact the mods, please message <@575252669443211264> and we will get back to you shortly.');
      }
      message.channel.bulkDelete(1);
      message.channel.send(`📨 Hey, ${user} I just sent you a DM! Please check it!`);
    },
    
  };