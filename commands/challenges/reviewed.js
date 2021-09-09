const Discord = require('discord.js');
const connection = require('../../database.js');


module.exports = {
    name: 'reviewed',
    description: 'This gives **mods** the ability to review submissions.',
    usage: '/reviewed [message ID] [number of points]',
    options: [
        {
            name: 'message-id',
            type: 'STRING',
            required: true,
            description: 'Please enter the message ID for the message you want to mark as reviewed.',
        },
        {
            name: 'points',
            type: 'STRING',
            required: true,
            description: 'How many points are you awarding?'
        }
    ],
    example: '/reviewed 841143871689064448 1',
    inHelp: 'yes',
    userPerms: ['SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
    botPerms: ['SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
    modOnly: 'yes',
    challengeMods: 'yes',
    async execute(interaction) {
        let points = interaction.options.get('points').value;
        let msgId = interaction.options.get('message-id').value;
        let moderator = interaction.user.id;

        const msg = await connection.query(
            `SELECT msgId FROM Submissions WHERE msgId = ?;`,
            [msgId]
        );

        if (msg === 'undefined' || msg == 'undefined' || msg === undefined || msg == undefined) {
            interaction.reply('That message ID was not found.');
        }

        await connection.query(
            `UPDATE Submissions SET moderator = ? AND points = ? WHERE msgId = ?;`,
            [moderator, points, msgId]
        );

        interaction.reply({ content: '✅ I have reviewed the submission.', ephemeral: true });

    }
}