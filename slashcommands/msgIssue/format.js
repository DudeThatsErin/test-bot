const Discord = require("discord.js");
const ee = require('../../config/embed.json');

module.exports = {
	name: 'format',
	description: 'Asks people to format their code with backticks or by sharing their code on places like pastebin.com',
	options: [
		{
			name: 'user',
			description: 'Who are you sending this to? ID ONLY.',
			required: true,
			type: 6
		}
	],
	execute(interaction) {
		let usr = interaction.options.getUser('user');
		const formatEmbed = new Discord.MessageEmbed()
			.setColor(ee.format)
			.setTitle(`Did you format your code?`)
			.setURL('https://codinghelp.site/knowledgebase/faq/share-code/')
			.setThumbnail(ee.footericon)
			.setDescription(`Please format your code using backticks. If you don\'t understand, we have an example below. Future code you share will be deleted until you format it.`)
			.addFields(
				{ name: 'How do I format my code?', value: 'Great question! You will want to use the backtick key next to your keyboard. It looks like this \\`. It is next to your number 1 key on your keyboard.\n\nIf you have a single line of code, you will want to use a single backtick around your code like so: \\`<img src="image source here" alt="alt text here" />\\`\n\nIf you have multiple lines of code (2 or more) you will want to use 3 backticks around your code like so:\n``````\n<html>\nextra code here...\nanother line here...\n</html>\n\u17b5`\u17b5`\u17b5`\u17b5```\nThis outputs this:\n```<html>\nextra code here...\nanother line here...\n</html>```\nAlso, highlight the syntax, after the first 3 backticks you will write the type of code it is, like HTML, JavaScript, Java, Bat (for batch files), etcetera. Highlighted code looks like so:\n```html\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>```' },
				{ name: 'Why do I have to format my code?', value: 'You need to format it because it is easy to read regardless of what device you are using to view Discord. So, to make it easier for all our members to be able to help you, we ask that you format your code as shown above.' }
			)
			.setFooter(ee.footertext, ee.footericon)

		usr.send({ content: `Hey, ${usr}!`, embeds: [formatEmbed] });
		interaction.reply({ content: `???? I just sent that user a direct message about formatting their code.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });

	},

};