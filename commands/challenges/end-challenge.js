const connection = require('../../database.js');

module.exports = {
    name: 'end-challenge',
    description: 'This gives **mods** the ability to end the challenge that was just being played.',
    usage: '/end-challenge',
    example: '/end-challenge',
    inHelp: 'yes',
    options: [],
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: ['MANGE_MESSAGES', 'VIEW_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
    botPerms: ['MANGE_MESSAGES', 'VIEW_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
    async execute(interaction) {
        connection.query(
            `DELETE FROM Challenge WHERE guildId = ?;`,
            [interaction.guild.id]
        );
        connection.query(
            `DELETE FROM Challenges WHERE guildId = ?;`,
            [intearction.guild.id]
        );
        connection.query(
            `DELETE FROM Submissions WHERE guildId = ?;`,
            [interaction.guild.id]
        );

        interaction.reply({ content: '✅ Challenge has ended and everything has been deleted from the database.', ephermal: true });

    }
}