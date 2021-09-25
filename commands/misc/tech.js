module.exports = {
    name: 'tech',
    description: 'Refers user to the Techway Server for additional technical help.',
    aliases: ['tw', 'techway', 'tech-help', 'th'],
    usage: '++tech',
    example: '++tech or ++tw',
    inHelp: 'yes',
    userPerms: [''],
    botPerms: [''],
    execute(message) {

        message.channel.send('Hey! Not sure if you knew this but you can visit the Techway server for additional help. Here is the invite link: https://discord.gg/cBUetVq');
    },

};