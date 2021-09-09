const connection = require('../../database.js');

module.exports = {
    name: 'purge-submissions',
    description: 'This gives **mods** the ability to purge all submissions from the submissions database.',
    note: 'This does *not* delete them from the channel within discord.',
    usage: '/purge-submissions',
    options: [],
    example: '/purge-submissions',
    inHelp: 'yes',
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: ['MANGE_MESSAGES', 'VIEW_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
    botPerms: ['MANGE_MESSAGES', 'VIEW_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
    async execute(interaction) {

        connection.query(
            `DELETE FROM Submissions WHERE guildId = ?;`,
            [interaction.guild.id]
        );
        interaction.reply({ content: '✅', ephermal: true });



    }
}