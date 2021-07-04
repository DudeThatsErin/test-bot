const Discord = require("discord.js");

module.exports = {
    name: 'prune',
    description: 'Delete up to 99 messages. Only users with the `MANAGE_MESSAGES` role will be able to use this command.',
    aliases: ['delete', 'goaway'],
    usage: '++[command] number',
    example: '++prune [number 2-99]',
    inHelp: 'yes',
    userPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
    botPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
    execute(message, args) {

        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('Oops! That doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('Please enter a valid number between 2 and 99.');
        }

        if (message.channel.bulkDelete(amount, true)
            /*.then(deletedMessages => {
                            //filter the deleted messages with .filter()
                            var botMessages = deletedMessages.filter(m => m.author.bot);
                            var userPins = deletedMessages.filter(m => m.pinned);
                            var userMessages = deletedMessages.filter(m => !m.author.bot);

                            const deletEmbed = new Discord.MessageEmbed()
                                .setColor('	#00FF00')
                                .setTitle("Success! :thumbsup:")
                                .setFooter("r/CodingHelp Bot")
                                .setTimestamp()
                                .addField("Bot Messages Purged", botMessages.size, false)
                                .addField("User Pins Purged", userPins.size, false)
                                .addField("User Messages Purged", userMessages.size, false)
                                .addField("Total Messages Purged", deletedMessages.size, false);

                            message.channel.send(deletEmbed);
                        })
                            .catch(err => {
                                console.error(err);
                                message.channel.send('Whoops! There was an error trying to prune messages in this channel! Check the command and try again.');
                            })*/
        );
    }
};