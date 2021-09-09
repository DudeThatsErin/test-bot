const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'check-submissions',
    description: 'Mods & Users can use this to check on what submissions have been submitted for the challenge number specified.',
    usage: '/check-submissions <challenge number>',
    example: '/check-submissions 1 or /check-submissions 10',
    inHelp: 'yes',
    options: [
        {
            name: 'challenge-number',
            type: 'INTEGER',
            description: 'Please enter the challenge number that you would like to check submissions for.',
            required: true,
        },
    ],
    userPerms: ['SEND_MESSAGES', 'VIEW_CHANNELS', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
    botPerms: ['SEND_MESSAGES', 'VIEW_CHANNELS', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
    async execute(interaction, client) {
        // both
        let name = interaction.user.id;
        let challengeNo = interaction.options.get('challenge-number').value;
        const modRoles = ['780941276602302523', '822500305353703434', '718253309101867008', '751526654781685912'];
        const modIDs = ['732667572448657539', '455926927371534346', '541305895544422430'];
        const isMod = modIDs.reduce((alrdyGod, crr) => alrdyGod || interaction.content.toLowerCase().split(' ').includes(crr), false);
        let value = 0;
        for (const ID of modRoles) {
            if (!interaction.member.roles.cache.has(ID)) {
                // if user has a modRole

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
                    const notDefined1 = new Discord.MessageEmbed()
                        .setColor('#3e5366')
                        .setTitle(`The submission by ${username} for Challenge ${dayNo} has not been reviewed yet.`)
                        .setDescription(`Their submission is as follows:\n${Submissions}\n\nThey had this attachment:\n${attachment}\n\nTheir message ID is as follows: \`${msgId}\``)
                        .setFooter('If there is a problem with this, please report this!');

                    // Defined Embed
                    const defined1 = new Discord.MessageEmbed()
                        .setColor('#d4a066')
                        .setTitle(`The submission by ${username} for Challenge ${dayNo} has been reviewed.`)
                        .setDescription(`Their submission is as follows:\n${Submissions}\n\nThey had this attachment:\n${attachment}\n\nTheir message ID is as follows: \`${msgId}\`\n\nThe moderator that reviewed it was: ${modname}.`)
                        .setFooter('If there is a problem with this, please report this!');

                    if (moderator === '0') {
                        interaction.client.users.cache.get(`${name}`).send({ embeds: [notDefined1] });
                    } else {
                        interaction.client.users.cache.get(`${name}`).send({ embeds: [defined1] });
                    }

                }
                if (value != modRoles.length && isMod) {
                    interaction.reply(`Please do not ping the mods. If you need to contact them, please message <@575252669443211264> to open a ModMail ticket. Thank you!`);
                }
            }

            // user
            const result = await connection.query(
                `SELECT * FROM Submissions WHERE guildId = ? AND author = ?;`,
                [interaction.guild.id, name]
            );

            for (const row of result[0]) {
                const Submissions = row.message || 'No message included with this submission.';
                const dayNo = row.challengeNo;
                const moderator = row.moderator;
                const msgId = row.msgId;
                const modname = await interaction.client.users.fetch(moderator).catch(err => { console.log(err); });
                const attachment = row.file || 'No attachment included for this submission';


                // notDefined Embed
                const notDefined = new Discord.MessageEmbed()
                    .setColor('#3e5366')
                    .setTitle(`The submission for Challenge ${dayNo} has not been reviewed yet.`)
                    .setDescription(`The submission is as follows:\n${Submissions}\n\nYou had this attachment:${attachment}\n\nThe message ID is as follows: \`${msgId}\``)
                    .setFooter('If there is a problem with this, please report this!');

                // Defined Embed
                const defined = new Discord.MessageEmbed()
                    .setColor('#d4a066')
                    .setTitle(`The submission for Challenge ${dayNo} has been reviewed.`)
                    .setDescription(`The submission is as follows:\n${Submissions}\n\nYou had this attachment:\n${attachment}\n\nThe message ID is as follows: \`${msgId}\`\n\nThe moderator that reviewed it was: ${modname}.`)
                    .setFooter('If there is a problem with this, please report this!');

                if (moderator === '0') {
                    interaction.client.users.cache.get(`${name}`).send({ embeds: [notDefined] });
                } else {
                    interaction.client.users.cache.get(`${name}`).send({ embeds: [defined] });
                }

                // mod


            }
        }
    }
}