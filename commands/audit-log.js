const connection = require('../../database.js');

module.exports = {
  name: 'audit-log',
  description: 'Allows **mods** to store the channel ID for audit/moderation logs. You must run this before the audit log system will work.',
  aliases: ['auditlog', 'log', 'modlog', 'al', 'ml'],
  usage: 's.audit-log [channel ID]',
  inHelp: 'yes',
  example: 's.audit-log 825856708592009216',
  userPerms: ['MANAGE_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  execute(message, args) {
    let log = args[0];
    connection.query(
      `INSERT INTO Guilds (guildId, guildName, ownerID, region, auditLog) VALUES (?, ?, ?, ?, ?);`,
      [message.guild.id, message.guild.name, message.guild.owner.id, message.guild.region, log]
    );

    message.reply(`I have added the <#${log}> channel to the database and turned audit logs on. You will now be receiving logs to that channel. To turn this off run \`s.logs-off\` at any time.`);
  }
}