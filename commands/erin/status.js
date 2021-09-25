const Discord = require('discord.js');

module.exports = {
    name: 'server-status',
    aliases: ['status-update', 'statusupdate', 'serverstatus'],
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: 's.server-status Status Message',
    note: '',
    permissions: '',
    ownerOnly: 'yes',
    async execute(message, args) {

            const reason = args.slice(0).join(" ");
            if (!reason) return message.reply('Erin, you forgot to include a status message. SMH');


            let embed = new Discord.MessageEmbed()
                .setColor('#EB74EE')
                .setTitle('Hello, Erin has a new update for you!')
                .setDescription(`${reason}`)
                .setTimestamp()
                .setFooter('Thanks for using Sakura Moon!');
            message.delete();
            message.channel.send({ content: `Hey, <@&850979569515102238>,`, embeds: [embed] }) // Server Updates 850979569515102238 or Bot Updates 850979691842109470

    }
};