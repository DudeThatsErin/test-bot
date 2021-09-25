module.exports = {
	name: 'docs',
	description: 'Sends the user to check out our docs on our website.',
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
		usr.send(`Hey, ${usr}!` + ' It looks like we have already answered this on our website. Please check it out here: https://codinghelp.site/');
		interaction.reply({ content: `📨 I just sent that user a direct message about how their question was answered on our wiki/knowledgebase/website.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });


	},

};