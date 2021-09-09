const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'submit',
    description: 'This is how users can submit answers to the challenge questions.',
    usage: '/submit [challenge number] [answer]',
    options: [
        {
            name: 'challenge-number',
            type: 'INTEGER',
            required: true,
            description: 'Please enter the challenge number you would like to submit an answer to.'
        },
        {
            name: 'answer',
            type: 'STRING',
            required: false,
            description: 'What is the answer you are submitting to this challenge?'
        }
    ],
    example: '\`\`\`/submit 1 ` ` `language\n//code here ` ` `\nadditional information here.\n\`\`\`\nPlease remove the spaces between the backticks before language and after \`//code here\`. If you are submitting a link, please use this format: \`\`\`/submit 1 https://github.com\`\`\` Meaning keep it all on the same line. Not formatting it this way will cause issues with our system.',
    note: 'Files are accepted! Just leave the `[answer]` field blank when submitting so just type `/submit [challenge number]` and then upload your file.',
    inHelp: 'yes',
    cooldown: 400,
    userPerms: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTACH_FILES'],
    botPerms: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTACH_FILES'],
    async execute(interaction) {

        let msgId = interaction.id;
        let guildId = interaction.guild.id;
        let dayNo = interaction.options.get('challenge-number').value;
        let answer = interaction.options.get('answer').value || 'only attachment submitted';

        const result = await connection.query(
            `SELECT * FROM Submissions WHERE guildId = ?;`,
            [guildId]
        );
        if (result == undefined) {
            interaction.reply('You already made a submission to this challenge. You may not submit more than one answer per challenge question. If you need to modify your submission, please use the \`/edit-submission [challenge number] [new answer]\` slash command. Thank you!');
            return;
        } else {

            let author = interaction.user.id;
            let tag = interaction.user.username;

            if (interaction.attachments.size === 0) {
                connection.query(
                    `INSERT INTO Submissions (guildId, msgId, author, message, challengeNo, moderator, points) VALUES (?, ?, ?, ?, ?, ?, ?);`,
                    [guildId, msgId, author, answer, dayNo, 0, 0]
                );

                let embed = new Discord.MessageEmbed()
                    .setColor('#616169')
                    .setTitle(`Thank you, ${tag}, for submitting your answer for challenge ${dayNo}.`)
                    .setDescription(`The answer you submitted was:\n${answer}\n\nIf you want to modify your answer, please copy and paste this command with your updated answer: \`++modify-answer ${msgId} [replace this with your new answer]\``)
                    .setFooter(`If you need to modify your answer please run the ++modify-answer command. Thank you!`);
                interaction.delete();
                interaction.client.users.cache.get(`${author}`).send({ embeds: [embed] });
            }
            interaction.attachments.forEach(async attachment => {
                const url = attachment.url;
                connection.query(
                    `INSERT INTO Submissions (guildId, msgId, author, message, file, challengeNo, moderator, points) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                    [guildId, msgId, author, answer, url, dayNo, 0, 0]
                );

                let embed = new Discord.MessageEmbed()
                    .setColor('#616169')
                    .setTitle(`Thank you, ${tag}, for submitting your answer for challenge ${dayNo}.`)
                    .setDescription(`The answer you submitted was:\n${answer}\n\nThis is the attachment you submitted: ${url}\n\nIf you want to modify your answer, please copy and paste this command with your updated answer: \`++modify-answer ${msgId} [replace this with your new answer]\``)
                    .setFooter(`If you need to modify your answer please run the ++modify-answer command. Thank you!`);
                interaction.delete();
                interaction.client.users.cache.get(`${author}`).send({ embeds: [embed] });
            });


        }

    }
}