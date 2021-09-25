module.exports = {
	name: 'elaborate', 
	description: 'Asks people to elaborate by including code or by including more information.',
	aliases: ['explain', 'more-info', 'moreinfo'],
	usage: '++elaborate @username or user ID',
	example: '++elaborate @DudeThatsErin',
	inHelp: 'yes',
	userPerms: [''],
	botPerms: [''],
	execute(message) {
		const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		if (!user) {
			message.react('❌')
			message.channel.send('You need to specificy a user via mention or the ID.');;
			return;
		}
		else { 
		  let usr = message.mentions.members.first();
			message.channel.send(`Hey, ${usr}!` + ' Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. :smile:');
		}
		message.channel.bulkDelete(1);

	},
	
};