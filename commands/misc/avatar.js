const Discord = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

module.exports = {
    name: 'av',
    description: 'Allows users to see other users avatars in a big form.',
    aliases: ['a', 'avatar', 'icon', 'pfp'],
    usage: '++av',
    example: '++av or ++avatar',
    inHelp: 'yes',
    userPerms: [''],
    botPerms: [''],
    execute(message, args) {
        let myEmbed = new Discord.MessageEmbed()
            .setColor('#66ADA2')
            .setTitle(`Your Avatar`)
            .setDescription(`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
            .setThumbnail(`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);

        if (!message.mentions.users.size) {
            return message.channel.send({ embeds: [myEmbed] });
        }
        
        let theirEmbed = new Discord.MessageEmbed()
            .setColor('#66ADA2')
            .setTitle(`These are the avatar's you wanted to see.`)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({format: 'png', dynamic: true})}`);

        const avatarList = message.mentions.users.map(user => {
            theirEmbed.addField(`${user.username}'s avatar:`, `${user.displayAvatarURL({ format: 'png', dynamic: true })}`)
        });

        message.channel.send({ embeds: [theirEmbed] });
    }

};