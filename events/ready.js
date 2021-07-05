const connection = require('../database.js');

console.log('|-----------------------------------|')
console.log('          Logging In...             ')
console.log('|-----------------------------------|')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`   ${client.user.tag} is\n   logged in and ready!`);
        console.log('|-----------------------------------|')
        console.log('          Error Logs...             ')
        console.log('|-----------------------------------|')

        client.user.setPresence({
            status: "online",
            activity: {
                name: `the server. Run test.help to see my commands.`,
                type: "LISTENING"
            }
        });

        //prefixes
        client.guilds.cache.forEach(guild => {
            connection.query(
                `SELECT prefix FROM Guilds WHERE guildId = ?;`,
                [guild.id]
            ).then(result => {
                client.guildCommandPrefixes.set(guild.id, result[0][0].prefix);
            }).catch(err => console.log(err));
        });
    }
}