const Discord = require('discord.js');

module.exports = {
    name: 'error',
    description: 'Tells users how to read error messages.',
    aliases: ['uhh', 'issue', 'err'],
    usage: '++error <@username or ID>',
    example: '++error or ++issue or ++err',
  inHelp: 'yes',
  userPerms: [''],
  botPerms: [''],
    execute(message, args) {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) {
            message.channel.send('You need to specificy a user via mention or the ID.');
            message.delete();
            return;
          }
          else {
        message.delete();
        message.channel.send(`Hey, ${user}, It looks like you have a question about an error message you received with your code. If you check out the following tutorial, it can teach you how to read error messages that you receive.\nhttps://codinghelp.site/knowledgebase/faq/how-do-i-read-this-error-message/`)
          }
    }

};