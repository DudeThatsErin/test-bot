const Discord = require("discord.js");

module.exports = {
	name: 'justask',
	description: 'Tells users to just ask their question instead of asking if someone is here or if someone can help them.',
	aliases: ['ja', 'ask', 'just-ask'],
	usage: '++justask @username or userID',
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
			usr.send(`Hey, ${usr}!` +  ' Please just ask your question according to our rules. Rule 2 explains that you should just ask instead of asking any of the following questions. Click the link below as your question could have been answered there as well.\n**Do not ask the following quesitons:**\n```css\nIs anyone available?\nCan someone please help me?\nWhenever someone gets online, can you help me?\n```\nOur Website: https://codinghelp.site');
		}
		message.channel.bulkDelete(1);
		message.channel.send(`📨 Hey, ${user} I just sent you a DM! Please check it!`);
	},
	
};