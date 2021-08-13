const connection = require('../../database.js');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'report',
    description: 'You can report problems with r/CodingHelp to the developers so that they can fix it.',
    aliases: ['reports', 'err', 'error', 'issue', 'issues'],
    inHelp: 'yes',
    usage: '++report <report>',
    example: '++report The bot is broken!',
    userPerms: [''],
    botPerms: [''],
    async execute(interaction, client) {
        let author = interaction.user.id;
        let usr = interaction.guild.members.cache.get(author);
        let messageId = interaction.id;
        let description = interaction.options.get('issue').value;
        if (!description && !interaction.attachments.first()) return interaction.reply('Please tell me what you would like to report. You can upload a file but please use words as well. A file alone does not tell me very much at all.')
        const channel = client.channels.cache.find(channel => channel.id === config.bot.reportsChId);
        let authorUsername = interaction.user.username;
        let avatar = interaction.user.displayAvatarURL({ dynamic: true });

        const url = 'no' || message.attachments.first().url;

        let report2 = new Discord.MessageEmbed()
            .setColor('#D4AC0D')
            .setTitle(`Oops! A wild *bug* has appeared!`)
            .setAuthor(`${authorUsername}`)
            .setThumbnail(`${avatar}`)
            .setDescription(`**This is the report:**\n${description}\n\n**Any files uploaded?**\n${url}`)
            .setTimestamp()
            .setFooter('This was all of the information I could grab from the report.', config.bot.avatar)

        const msg = await channel.send({ embeds: [report2] });

        const reportNo = msg.id;
        let report = new Discord.MessageEmbed()
            .setColor('#D4AC0D')
            .setTitle('Erin has received your report.')
            .setDescription(`**This is the report:**\n${description}\n\n**Any files uploaded?**\n${url}\n\n**Message ID**\n\`${reportNo}\`\nPlease save this message ID. Use the slash command \`/status-report ${reportNo}\` to check the status of your report.`);

        await connection.query(
            `INSERT INTO reports (messageId, authorId, avatar, description, file) VALUES(?, ?, ?, ?, ?);`,
            [reportNo, author, avatar, description, url]
        );

        interaction.reply({ content: `I have sent your report to ${config.bot.devName}! Please check your private messages for the message ID so that you can check the status of your report. Thank you!` });
        usr.send({ embeds: [report] })
    }
}