const connection = require('../database.js');

module.exports = {
    name: 'logs-off',
    description: 'Allows **mods** to disable the audit log system.',
    aliases: ['logoff'],
    usage: 's.logs-off',
    inHelp: 'yes',
    example: 's.logs-off',
    execute (message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES") ){
      let log = args[0];
      createConnection.query(
        `DELETE FROM Guilds WHERE guildId = ? AND auditLog = ?;`,
        [message.guild.id, log]
      );

      message.reply(`I have removed the <#${log}> channel from the database and turned audit logs off. You will stop receiving logs in that channel. To re-enable run \`s.audit-log\` at any time.`);
    } else {
        message.reply('You do not have the required permissions to run this command. You must have the \`MANAGE_MESSAGES\` permissions to run this command.');
      }
    }
}