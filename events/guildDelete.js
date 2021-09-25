const connection = require('../database.js');

module.exports = {
    name: 'guildDelete',
    async execute(guild, client) {
        // Get audit log channel.
        const results = await connection.query(
            `SELECT auditLog FROM Guilds WHERE guildId = ?;`,
            [guild.id]
        );
        const logId = results[0][0].auditLog;
        const owner = await client.users.fetch(guild.owner.id);
        const name = owner.tag;
        guild.channels.cache.get(logId).send(`I have just been removed from ${guild.name} by ${name}`);
    }
}