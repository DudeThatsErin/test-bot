const { MessageEmbed } = require("discord.js");
const config = require('../../config/config.json');
const prefix = config.prefix;
const ee = require('../../config/embed.json');
const { ButtonPaginator } = require('@psibean/discord.js-pagination');

module.exports = {
	name: 'help',
	description: 'This allows users to find out more information on all of our commands.',
	type: 'STRING',
	options: [
		{
			name: 'commandname',
			description: 'Type command name here or leave blank to see all commands.',
			required: false,
			type: 'STRING'
		}
	],
	async execute(interaction) {

		const pages = [];
		const roleColor =
			interaction.guild.me.displayHexColor === "#000000"
				? "#ffffff"
				: interaction.guild.me.displayHexColor;

		const description = `These are all of the commands Sakura Moon can do. If you want to get more information you can do \`${prefix}help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.`;


		const embed1 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - General Commands')
			.setDescription(description)
			.addFields(
				{
					name: 'These are the general commands. By general, we mean commands that are **not** slash commands.',
					value: '```css\nprune\nreport\nstatusreport\ninvite\nserver-info\nuser-info\n```'
				}
			);

		const embed2 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - Slash Commands')
			.setDescription(description)
			.addFields(
				{
					name: 'These are all of our slash commands. This means that you type `/` before the command name to access them.',
					value: '```css\navatar\ncoin\nreddit\ntech\nrolldie\ncoinflip\nhelp\nping\n```'
				},
				{
					name: 'These are the slash commands having to do with message issues.',
					value: '```css\nbin\nchannel\ndocs\nelaboriate\nerror\nformat\nhire\njust-ask\nmods\npatience\nshare-code\nwiki\nwrong-channel\n```'
				}
			)

		const embed3 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - Moderator Only Commands')
			.setDescription(description)
			.addFields({
				name: 'These are general **moderator** only commands. Meaning only **moderators** can use these commands.',
				value: '```css\nprune\ndm\nrules\npartner\nserver-status\nsub-status\nbot-status\nsite-status\n```'
			});

		const embed4 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - Suggestion System Commands')
			.setDescription(description)
			.addFields({
				name: 'These are commands any user can use for our Suggestions System.',
				value: '```css\nsuggestions\neditsugg\nstatussugg\n```'
			}, {
				name: 'These are our **moderator** only commands for our Suggestions System.',
				value: '```css\nprog-sugg\ndenied-sugg\ncompletedsugg\n```'
			});

		const embed5 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - Thanks System Commands')
			.setDescription(description)
			.addFields({
				name: 'These are the commands you can use for our Thanks System.',
				value: '```css\nthanks\nunthanks\nthanks-on\nthanks-off\nthanks-leaderboard\n```'
			});

		const embed6 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - Challenge System Commands')
			.setDescription(description)
			.addFields({
				name: 'These are commands any user can use for our Challenge System.',
				value: '```css\nsubmit\nedit-submission\nchallenge-leaderboard\n```'
			}, {
				name: 'These are our **moderator** only commands for our Challenge System.',
				value: '```css\nadd-members\nadd-users\ncheck-participants\nremove-participant\nstart-challenge\nchallenge\nedit-challenge\ncheck-submissions\nreviewed\npurge-submissions\nend-challenge\n```'
			});

		pages.push(embed1);
		pages.push(embed2);
		pages.push(embed3);
		pages.push(embed4);
		pages.push(embed5);
		pages.push(embed6);

		let cmdd = interaction.options.getString('commandname');

		if (cmdd) { //WORKS

			const cmd = interaction.client.commands.get(cmdd) || interaction.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdd));
			if (!cmd) return interaction.reply({ content: "That command could not be found!", ephemeral: true });

			const emb = new MessageEmbed()
				.setColor(roleColor)
				.setTitle(`Help for \`${prefix}${cmd.name}\``);
			if (cmd.description) {
				emb.setDescription(cmd.description, true);
			} else {
				emb.setDescription("No description could be found");
			}
			if (cmd.note) {
				emb.addField("Note:", cmd.note, false)
			}
			if (cmd.aliases) {
				emb.addField("Aliases", cmd.aliases.join(", "), false);
			}
			if (cmd.cooldown) {
				emb.addField("You need to wait this long between usages of this command:", `${cmd.cooldown} seconds`, false)
			}
			if (cmd.usage) {
				emb.addField("Usage", cmd.usage, false);
			}
			if (cmd.example) {
				emb.addField("Example Usage", cmd.example, false)
			}
			if (cmd.ownerOnly) {
				emb.addField("THIS IS ONLY A COMMAND ERIN CAN USE. Right?", cmd.ownerOnly, false)
			}
			if (cmd.userPerms) {
				emb.addField("You must have these permissions to run this command:", cmd.userPerms, false)
			}
			if (cmd.botPerms) {
				emb.addField('I must have these permissions to run this command:', cmd.botPerms, false)
			}
			emb.setFooter(ee.footertext, ee.footericon);

			interaction.reply({ embeds: [emb], ephemeral: true })

		} else {
			const buttonPaginator = new ButtonPaginator(interaction, { pages });
			await buttonPaginator.send();
		}

	},
};