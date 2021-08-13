const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'mod-check-submissions',
    description: 'This allows **mods** to check who has submitted a response.',
    aliases: ['mcs', 'mcksubs', 'mck-subs', 'modchecksubmissions'],
    usage: '++mod-check-submissions [challenge number]',
    example: '++mod-check-submissions 1',
    inHelp: 'yes',
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: [''],
    botPerms: [''],
    async execute(interaction) {
        let name = interaction.user.id;
        let challengeNo = interaction.options.get('challenge-number').value;

        const result2 = await connection.query(
            `SELECT * FROM Challenge WHERE guildId = ? AND challengeNo = ?;`,
            [interaction.guild.id, challengeNo]
        );
        const number = result2[0][0].challengeNo;
        const question = result2[0][0].title;
        let embed = new Discord.MessageEmbed()
            .setColor('#3fa066')
            .setTitle(`This is the question that was asked during Challenge ${number}`)
            .setDescription(`${question}`)
            .setFooter('If this is not right, please report it!');
        interaction.reply(`📨 I have sent you a private message!`)
        interaction.client.users.cache.get(`${name}`).send({ embeds: [embed] });

        const result = await connection.query(
            `SELECT * FROM Submissions WHERE guildId = ? AND challengeNo = ?;`,
            [interaction.guild.id, challengeNo]
        );

        for (const row of result[0]) {
            const Members = row.author;
            const Author = await interaction.client.users.fetch(Members).catch(err => { console.log(err); });
            const username = Author.username;
            const Submissions = row.message || 'no message included with this submission.';
            const dayNo = row.challengeNo;
            const moderator = row.moderator;
            const msgId = row.msgId;
            const modname = await interaction.client.users.fetch(moderator).catch(err => { console.log(err); });
            const attachment = row.file || 'no attachment included with this submission';


            // notDefined Embed
            const notDefined = new Discord.MessageEmbed()
                .setColor('#3e5366')
                .setTitle(`The submission by ${username} for Challenge ${dayNo} has not been reviewed yet.`)
                .setDescription(`Their submission is as follows:\n${Submissions}\n\nThey had this attachment:\n${attachment}\n\nTheir message ID is as follows: \`${msgId}\``)
                .setFooter('If there is a problem with this, please report this!');

            // Defined Embed
            const defined = new Discord.MessageEmbed()
                .setColor('#d4a066')
                .setTitle(`The submission by ${username} for Challenge ${dayNo} has been reviewed.`)
                .setDescription(`Their submission is as follows:\n${Submissions}\n\nThey had this attachment:\n${attachment}\n\nTheir message ID is as follows: \`${msgId}\`\n\nThe moderator that reviewed it was: ${modname}.`)
                .setFooter('If there is a problem with this, please report this!');

            if (moderator === '0') {
                interaction.client.users.cache.get(`${name}`).send({ embeds: [notDefined] });
            } else {
                interaction.client.users.cache.get(`${name}`).send({ embeds: [defined] });
            }
        }
    }
}