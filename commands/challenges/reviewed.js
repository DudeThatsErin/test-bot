const Discord = require('discord.js');
const connection = require('../../database.js');


module.exports = {
    name: 'reviewed',
    description: 'This gives **mods** the ability to review submissions.',
    aliases: ['mark', 'review'],
    usage: '++reviewed [challenge number] <number of points> [message ID]',
    example: '++reviewed 1 1 841143871689064448',
    inHelp: 'yes',
    userPerms: [''],
    botPerms: [''],
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
        console.log(msg[0])
        if (msg === 'undefined' || msg == 'undefined' || msg === undefined || msg == undefined) {
            interaction.reply('That message ID was not found.');
        }

        await connection.query(
            `UPDATE Submissions SET moderator = ? AND points = ? WHERE msgId = ?;`,
            [moderator, points, msgId]
        );

        interaction.reply('I have reviewed the submission.');

    }
}