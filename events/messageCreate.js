const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {

        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(config.bot.prefix)) return;

        const [cmd, ...args] = message.content.slice(config.prefix.length).trim().split(" ");

        const command = client.commands.length(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;

        message.reply('This is a depreciated command. Erin, you need to update this command still!');
    }
}// end client.on message