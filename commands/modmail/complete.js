const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'complete',
    description: 'Marks a ticket as complete',
    aliases: ['done'],
    usage: '++complete <message to user>',
    cooldown: 5,
    inHelp: 'yes',
    example: '++complete Thank you for the report!',
    execute(message, args) { 
        const complete = new Discord.MessageEmbed()
            .setColor('36393E')
            .setAuthor(`Hey, ${supportUser.tag}`, supportUser.displayAvatarURL)
            .setFooter('Ticket Closed')
            .setDescription('*Your ModMail has been marked as **Complete**. If you wish to reopen this, or create a new one, please send a message to the bot.*');
            
        supportUser.send(complete);
        message.channel.delete()
            .then(console.log(`Support for ${supportUser.tag} has been closed.`))
            .catch(console.error);
        return db.delete(`support_${support.targetID}`);
    }
  };