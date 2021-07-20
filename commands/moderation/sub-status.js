const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'sub-status',
    aliases: ['sub-update', 'substatus', 'subupdate'],
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: '++sub-status Status Message',
    modOnly: 'yes',
    inHelp: 'yes',
    userPerms: [''],
    botPerms: [''],
    modOnly: 'yes',
    async execute(message, args, client) {

        const reason = args.slice(0).join(" ");
        if (!reason) return message.reply('You forgot to include a status message. SMH');

        const channel = client.channels.cache.find(channel => channel.id === config.bot.announcementsId);
        let embed = new Discord.MessageEmbed()
            .setColor('#EB74EE')
            .setTitle('Hello, The Moderators have a new update for you!')
            .setDescription(`${reason}`)
            .setTimestamp()
            .setFooter('Want to suggest a feature for the subreddit? Use ++suggest');
        message.react('👍');
        channel.send(`Hey, <@&780111997861363742>,`, embed) // Subreddit Updates 780111997861363742 or Bot Updates 772154227459883019 or Server Updates 772153457111990282




    }
};