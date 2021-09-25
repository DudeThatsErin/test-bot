const connection = require('/root/test/database.js');

module.exports = {
  name: 'audit-log',
  description: 'Allows **mods** to store the channel ID for audit/moderation logs. You must run this before the audit log system will work.',
  aliases: ['auditlog', 'log', 'modlog', 'al', 'ml'],
  usage: 's.audit-log [channel ID] [selection of audit logs to turn on or the word all]',
  inHelp: 'yes',
  example: 's.audit-log 825856708592009216 invite logs, join logs, leave logs or s.audit-log 825856708592009216 all',
  botPerms: ['MANAGE_MESSAGES'],
  userPerms: ['MANAGE_MESSAGES'],
  note: 'You can turn on whatever logs you would like to. Just put it after the channel ID. If you put all after the channel ID you will turn on all audit logs.',
  execute(message, args) {
    let logChannel = args[0];
    let logs = [];
    let logOptions = args.slice(1).join(' ').split(",")
    logOptions.forEach(logs => {
      logOptions.push(logs);
    });

    connection.query(
      `INSERT INTO Guilds (guildId, guildName, ownerID, region, auditLog) VALUES (?, ?, ?, ?, ?);`,
      [message.guild.id, message.guild.name, message.guild.owner.id, message.guild.region, log]
    );

    message.reply(`I have added the <#${log}> channel to the database and turned audit logs on. You will now be receiving logs to that channel. To turn this off run \`s.logs-off\` at any time.`);
  }
}