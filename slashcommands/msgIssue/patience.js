module.exports = {
	name: 'patience',
	description: 'Tells people to be patient when waiting for advice.',
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
		usr.send(`Hey, ${usr}!` + ' Please give our users some time to review your question. We understand your excitment and appreciate it but our users need time to look over your question and give you the proper information. Please only post your question once every 48 hours and do not ask for help in multiple channels.\nYou can also check out our website to see if your question is answered there: https://codinghelp.site');
		interaction.reply({ content: `📨 I just sent that user a direct message asking the user to be patient.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });

	},

};