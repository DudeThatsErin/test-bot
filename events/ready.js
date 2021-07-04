const Discord = require('discord.js');

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
                name: `the server. Run !help to see my commands.`,
                type: "LISTENING"
            }
        });
    }
}