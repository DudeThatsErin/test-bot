const Discord = require('discord.js');

module.exports = {
    name: 'bot',
    description: 'This displays all of the information for Sakura Moon.',
    aliases: ['client', 'sakuramoon', 'sakura', 'moon', 'sakura-moon', 'sm'],
    usage: 's.bot',
    inHelp: 'yes',
    example: 's.bot or s.sakuramoon',
    execute (message, args) {
        let days = Math.floor(message.client.uptime / 86400000);
        let hours = Math.floor(message.client.uptime / 3600000) % 24;
        let minutes = Math.floor(message.client.uptime / 60000) % 60;
        let seconds = Math.floor(message.client.uptime / 1000) % 60;
      let embed = new Discord.MessageEmbed()
        .setColor('#e89cfd')
        .setTitle('Sakura Moon')
        .setDescription('This bot was created by Erin Skidds. She wanted to create this to challenge her JS knowledge. She released it to the public on BLANK DATE. This bot took her months to make. She is still learning reaction roles so they have not been implemented yet. This is version 1 of the bot.')
        .addFields(
            { name: '📈Uptime', value: `I have been up for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`, inline: false },
            { name: '♾️Support Server', value: 'https://discord.gg/tT3VEW8AYF', inline: false },
            { name: '🌑Invite Sakura to your server', value: 'https://discord.com/oauth2/authorize?client_id=819997306732019742&permissions=8&scope=bot', inline: false },
            { name: '⬆️ Vote for me on Top.gg', value: 'https://top.gg/bot/819997306732019742', inline: false },
            { name: '👩‍💻Developer', value: 'Erin Skidds', inline: false },
        )
        .setFooter('©️ 2021 Sakura Moon - Erin Skidds - DudeThatsErin#8061');

        message.channel.send(embed);
    }
}