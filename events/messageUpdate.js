const config = require('../config.json');
const GhostPing = require('discord.js-ghost-ping');
const connection = require('../database.js');

module.exports = {
    name: 'messageUpdate',
    async execute(message, client) {
        // Get audit log channel.
        const results = await connection.query(
            `SELECT auditLog FROM Guilds WHERE guildId = ?;`,
            [message.guild.id]
        );
        const logId = results[0][0].auditLog;
        GhostPing.detector('messageUpdate', oldMessage, newMessage);
        // Ignore direct messages
        if (!message.guild) return;
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_UPDATE',
        });
        // Since we only have 1 audit log entry in this collection, we can simply grab the first one
        const updateLog = fetchedLogs.entries.first();

        // Let's perform a coherence check here and make sure we got *something*
        if (!updateLog) return message.guild.channels.cache.get(logId).send(`A message by ${message.author.tag} was updated, but no relevant audit logs were found.`);

        // We now grab the user object of the person who deleted the message
        // Let us also grab the target of this action to double-check things
        const {
            executor,
            target
        } = updateLog;

        // And now we can update our output with a bit more information
        // We will also run a check to make sure the log we got was for the same author's message
        if (target.id === message.author.id) {
            message.guild.channels.cache.get(logId).send(`A message by ${message.author.tag} was updated by ${executor.tag}. The message said: ${message.content}`);
        } else {
            message.guild.channels.cache.get(logId).send(`A message by ${message.author.tag} was updated which said ${message.content}, but we don't know by who.`);
        }
    }
}