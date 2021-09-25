module.exports = {
	name: 'share-code',
	description: 'Tells people to share their code as shown in the <#383032186317832202> channel.',
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
		usr.send(`Hey, ${usr}!` + ' Please share your code as shown in our wiki. If it is too long for Discord, please upload it to a place like CodeShare.io and share the link to the code here so we can take a look at it. Thank you!\nSee here: https://codinghelp.site/wiki/faq/share-code/');
		interaction.reply({ content: `📨 I just sent that user a direct message about sharing their code.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });
	},

};