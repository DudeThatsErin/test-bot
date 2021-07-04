const connection = require('../database.js');

module.exports = {
    name: 'guildBanAdd',
    async execute(guild, client) {
        // Get audit log channel.
        const results = await connection.query(
            `SELECT auditLog FROM Guilds WHERE guildId = ?;`,
            [guild.id]
        );
        const logId = results[0][0].auditLog;
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });
        // Since we only have 1 audit log entry in this collection, we can simply grab the first one
        const banLog = fetchedLogs.entries.first();

        // Let's perform a coherence check here and make sure we got *something*
        if (!banLog) return guild.channels.cache.get(logId).send(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

        // We now grab the user object of the person who banned the user
        // Let us also grab the target of this action to double-check things
        const {
            executor,
            target
        } = banLog;

        // And now we can update our output with a bit more information
        // We will also run a check to make sure the log we got was for the same kicked member
        if (target.id === user.id) {
            guild.channels.cache.get(logId).send(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
        } else {
            guild.channels.cache.get(logId).send(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
        }
    }
}