const config = require('../config.json');

module.exports = {
    name: 'message',
    async execute(message, client) {
        if (!message.content.startsWith(config.client.prefix) || message.author.bot) return;

        const args = message.content.slice(config.client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;


        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
}