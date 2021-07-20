const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'end-challenge',
    description: 'This gives **mods** the ability to end the challenge that was just being played.',
    aliases: ['endchallenge', 'echallenge', 'exitchallenge', 'exitc', 'over'],
    usage: '++end-challenge',
    example: '++end-challenge',
    inHelp: 'yes',
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: [''],
    botPerms: [''],
    async execute (message, args) {
        let userNames = '';
        let points = '';
            
            connection.query(
                `DELETE FROM Challenge WHERE guildId = ?;`,
                [message.guild.id]
            );
            connection.query(
                `DELETE FROM Challenges WHERE guildId = ?;`,
                [message.guild.id]
            );
            connection.query(
                `DELETE FROM Submissions WHERE guildId = ?;`,
                [message.guild.id]
            );    

            message.reply('I have deleted everything from the databases and ended the challenge for you!')

    }
}