const connection = require('/root/test/database.js');

module.exports = {
    name: 'log-events',
    description: 'Displays all of the available events from Sakura Moon and advised whether they are enabled or disabled for your server.',
    aliases: ['auditlogevents', 'logevents', 'modlogevents', 'ale', 'mle'],
    usage: 's.log-events',
    inHelp: 'yes',
    example: 's.log-events',
    botPerms: ['MANAGE_MESSAGES'],
    userPerms: ['MANAGE_MESSAGES'],
    note: '',
    execute(message, args) {
        const guil = message.guild.id;
        connection.query(
            `SELECT * FROM logs WHERE guildId = ?;`,
            [guil]
        );

        message.reply(`I have added the <#${log}> channel to the database and turned audit logs on. You will now be receiving logs to that channel. To turn this off run \`s.logs-off\` at any time.`);
    }
}