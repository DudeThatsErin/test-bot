module.exports = {
    name: 'docs',
    description: 'Sends the user to check out our docs on our website.',
    aliases: ['useful-links'],
    usage: '++docs @username or user ID',
	example: '++docs @DudeThatsErin',
	inHelp: 'yes',
	userPerms: [''],
	botPerms: [''],
    execute(message, args) {
  		const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		if(!user) {
		  message.channel.send('You need to specificy a user via mention or the ID.');
		  message.delete();
		  return;
		}
		else { 
		  let usr = message.mentions.members.first();
			message.channel.send(`Hey, ${usr}!` + ' It looks like we have already answered this on our website. Please check it out here: https://codinghelp.site/');
		}
		message.channel.bulkDelete(1);

    },
    
  };