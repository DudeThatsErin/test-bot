module.exports = {
	name: 'elaborate',
	description: 'Asks people to elaborate by including code or by including more information.',
	options: [
		{
			name: 'user',
			description: 'Who are you sending this to? ID ONLY.',
			required: true,
			type: 6
		}
	],
	execute(interaction) {
		let user = interaction.options.getUser('user');
		user.send(`Hey, ${usr}!` + ' Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. :smile:');
		interaction.reply({ content: `📨 I just sent that user a direct message about elaborating.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });



	},

};