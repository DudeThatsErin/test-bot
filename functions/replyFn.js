module.exports = {
	name: "reply",
	async execute(param, message, args) {
		const Discord = param.Discord;
		const MessageAttachment = param.MessageAttachment;
		const client = param.client;
		const getEmbed = param.getEmbed;
		const config = param.config;
		const db = param.db;
		const threadPrefix = param.dbPrefix.thread;
		const isMember = param.isMember;
		const isBlocked = param.isBlocked;

		const mainServerID = config.mainServerID;
		const mainServer = await client.guilds.cache.get(mainServerID);
		const author = message.author;
		const channel = message.channel;

		const userID = channel.name.split("-").pop();
		const isThread = await db.get(threadPrefix + userID);
		const checkIsBlocked = await isBlocked.execute(param, author.id);

		const blockedEmbed = getEmbed.execute(param, config.error_color, "Blocked", `User blocked.`);
		const noDMEmbed = getEmbed.execute(param, config.error_color, "Not Sent", `User disabled Direct Message.`);
		const noUserEmbed = getEmbed.execute(param, config.error_color, "Not Found", `Couldn't find user in my collection.`);
		const noThreadEmbed = getEmbed.execute(param, config.error_color, "Not Found", `Couldn't find any thread asociated with this channel.`);

		if (!isThread) {
			return channel.send(noThreadEmbed);
		} else {
			const checkIsMember = await isMember.execute(param, userID);
			const notMemberEmbed = getEmbed.execute(param, config.error_color, "Not a Member", `User aren't inside [**${mainServer.name}**] guild.`);

			if (!checkIsMember) {
				return channel.send(notMemberEmbed);
			} else if (checkIsBlocked) {
				return channel.send(blockedEmbed);
			} else {
				const member = await mainServer.members.cache.get(userID);

				if (!member) {
					return channel.send(noUserEmbed);
				} else {
					const user = member.user;
					const description = args.join(' ');
					const userDMEmbed = new Discord.MessageEmbed()
						.setColor(config.sent_color)
						.setAuthor(author.tag, author.avatarURL())
						.setTitle("Message Received")
						.setDescription(description)
						.setFooter(mainServer.name, mainServer.iconURL())
						.setTimestamp();
					const threadChannelEmbed = new Discord.MessageEmbed()
						.setColor(config.sent_color)
						.setAuthor(author.tag, author.avatarURL())
						.setTitle("Message Sent")
						.setDescription(description)
						.setFooter(`${user.tag} | ${user.id}`, user.avatarURL())
						.setTimestamp();

					try{
						await user.send(userDMEmbed);
					} catch (error) {
						if(error.message == "Cannot send messages to this user") {
							return channel.send(noDMEmbed);
						}
					}
					await channel.send(threadChannelEmbed);
					if (message.attachments.size > 0) {
						await message.attachments.forEach(async atch => {
							const attachment = new MessageAttachment(atch.url);
							await user.send(attachment);
							await channel.send(attachment);
						});
					}
					return message.delete();
				}

			}
		}

	}
};
