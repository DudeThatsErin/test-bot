const connection = require('../database.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(guild, client) {
        // Get audit log channel.
        const results = await connection.query(
            `SELECT auditLog FROM Guilds WHERE guildId = ?;`,
            [member.guild.id]
        );
        console.log(member)
        const logId = results[0][0].auditLog;
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });
        // Since we only have 1 audit log entry in this collection, we can simply grab the first one
        const kickLog = fetchedLogs.entries.first();

        // Let's perform a coherence check here and make sure we got *something*
        if (!kickLog) return guild.channels.cache.get(logId).send(`${member.user.tag} left the guild, most likely of their own will.`);

        // We now grab the user object of the person who kicked our member
        // Let us also grab the target of this action to double-check things
        const {
            executor,
            target
        } = kickLog;

        // And now we can update our output with a bit more information
        // We will also run a check to make sure the log we got was for the same kicked member
        if (target.id === member.id) {
            member.guild.channels.cache.get(logId).send(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
        } else {
            member.guild.channels.cache.get(logId).send(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
        }
    }
}