const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const config = require('../config/config.json');
const prefix = config.prefix;
const ee = require('../config/embed.json');
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

		const helpEmbeds = [];
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
					value: '```css\nprune\nreport\nstatusreport\n```'
				}
			);

		const embed2 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - Slash Commands')
			.setDescription(description)
			.addFields(
				{
					name: 'These are all of our slash commands. This means that you type `/` before the command name to access them.',
					value: '```css\navatar\ndm - for **mods only**.\nroll\nreddit\ntech\nrolldie\ncoinflip\nhelp\n```'
				}
			)

		const embed3 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu - Moderator Only Commands')
			.setDescription(description)
			.addFields({
				name: 'These are general **moderator** only commands. Meaning only **moderators** can use these commands.',
				value: '```css\nprune\nupdate-prefix\nreset-prefix\nmute\nunmute\nwarn\nkick\nban\nunban\nreport\nstatusreport\ndm```'
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
				name: 'These are teh commands you can use for our Thanks System.',
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

		helpEmbeds = [];

		helpEmbeds.push(embed1);
		helpEmbeds.push(embed2);
		helpEmbeds.push(embed3);
		helpEmbeds.push(embed4);
		helpEmbeds.push(embed5);
		helpEmbeds.push(embed6);

		let cmdd = interaction.options.get('commandname').value;

		if (cmdd) { //WORKS

			const cmd = interaction.client.commands.get(cmdd) || interaction.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdd));
			if (!cmd) return interaction.reply({ content: "That command could not be found!", ephermal: true });

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
			if (cmd.patreonOnly) {
				emb.addField('Do you need to subscribe to Sakura Moon on Patreon to use this command?', cmd.patreonOnly, false)
			}

			const buttonPaginator = new ButtonPaginator(interaction, { pages });
			await buttonPaginator.send();

		} else {
			const buttonPaginator = new ButtonPaginator(interaction, { pages });
			await buttonPaginator.send();
		}

	},
};