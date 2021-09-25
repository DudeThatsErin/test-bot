module.exports = {
	name: 'justask',
	description: 'Tells users to just ask their question.',
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
		usr.send(`Hey, ${usr}!` + ' Please just ask your question according to our rules. Rule 2 explains that you should just ask instead of asking any of the following questions. Click the link below as your question could have been answered there as well.\n**Do not ask the following quesitons:**\n```css\nIs anyone available?\nCan someone please help me?\nWhenever someone gets online, can you help me?\n```\nOur Website: https://codinghelp.site');
		interaction.reply({ content: `📨 I just sent that user a direct message telling the user to just ask their question..\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });
	},

};