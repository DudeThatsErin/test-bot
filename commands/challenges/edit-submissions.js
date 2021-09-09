const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'edit-submission',
    description: 'This gives users the ability to edit the submission answers that they previously submitted. If you need your message ID, contact one of the Challenge Moderators and they can get that for you.',
    usage: '/edit-submission [message ID] [new answer]',
    options: [
        {
            name: 'message-id',
            required: true,
            type: 'STRING',
            description: 'What is the message ID for the answer you are updating?'
        },
        {
            name: 'answer',
            required: false,
            type: 'STRING',
            description: 'What is your updated answer?'
        }
    ],
    example: '/edit-submission 841302144727646269 I like pudding!',
    note: 'You are allowed to upload files. Just leave the `[new answer]` field blank and just upload',
    inHelp: 'yes',
    userPerms: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
    botPerms: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
    async execute(interaction) {

        let msgId = interaction.options.get('message-id').value;
        let title = interaction.options.get('answer').value;
        let msg = interaction.id;
        let author = interaction.user.username;
        let a = interaction.user.id;

        const results2 = await connection.query(
            `SELECT * FROM Submissions WHERE msgId = ?;`,
            [msgId]
        );
        let athor = results2[0][0].author;
        let reviewed = results[0][0].moderator;

        if (a !== athor) {
            interaction.reply({ content: `${author}, You are not the original author/poster of the submission. Only the original author/poster (aka OP) can edit their message. If you are receiving this message in error, please report this.`, ephermal: true });
            return;
        }
        if (reviewed !== '0') {
            interaction.reply({ content: `${author}, Your submission has already been reviewed. I am unable to modify a submission after it has been reviewed by moderators. If this is wrong, please report this. Thanks!`, ephermal: true });
            return;
        } else {
            interaction.attachments.forEach(async attachment => {
                const url = attachment.url;

                connection.query(
                    `UPDATE Submissions SET msgId = ?, Message = ?, file = ? WHERE msgId = ?;`,
                    [msg, url, title, msgId]
                );
                const newAnswer = title || url;
                let au = interaction.user.id;

                let embed = new Discord.MessageEmbed()
                    .setColor('#c9a066')
                    .setTitle(`I have updated your submission, Thanks ${author}!`)
                    .setDescription(`I have updated your submission to:\n${newAnswer}\n\nYour new message ID is:\n\`${msg}\``)
                    .setFooter('If there is a problem with this, please report it!');

                interaction.client.users.cache.get(`${au}`).send({ embeds: [embed] });
                interaction.reply({ content: '📨 I have sent you a message.', ephermal: true });
            });
        }
    }
}