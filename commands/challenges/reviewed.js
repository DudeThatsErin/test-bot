const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'reviewed',
    description: 'This gives **mods** the ability to review submissions.',
    aliases: ['mark', 'review'],
    usage: '++reviewed [challenge number] <number of points> [message ID]',
    example: '++reviewed 1 1 841143871689064448',
    inHelp: 'yes',
    userPerms: [''],
    botPerms: [''],
    modOnly: 'yes',
    async execute (message, args) {
        let role = message.member.roles.cache.has('839863262026924083') || message.member.roles.cache.has('718253309101867008') || message.member.roles.cache.has('846074806788685836');
        if(!role){ 
            message.channel.send('You don\'t have the `Challenge Mods` role so you can\'t use this command.');
            return;
        } else {
                let challengeNo = args[0];
                let points = args[1];
                let msgId = args[2];
                let moderator = message.author.id;

                if(!challengeNo) {
                    message.channel.send('You need to tell me what challenge number you would like to review.');
                    return;
                } else {
                    if(!points) {
                        message.channel.send('You need to tell me how many points to give the original author of this submission.');
                        return;
                    } else {
                        if(!msgId) {
                            message.channel.send('You need to include the message ID for the submission you would like to review. Without this I will not know which message to review.');
                            return;
                        } else {
                            connection.query(
                                `UPDATE Submissions SET moderator = ? WHERE msgId = ? AND guildId = ?;`,
                                [moderator, msgId, message.guild.id]
                            );
                            const result = await connection.query(
                                `SELECT author FROM Submissions WHERE msgId = ? AND guildId = ?;`,
                                [msgId, message.guild.id]
                            );
                            let user = result[0][0].author;
                            const Author = message.client.users.cache.get(user);
                            connection.query(
                                `UPDATE Submissions SET points = ? AND moderator = ? WHERE msgId = ?;`,
                                [points, moderator, msgId]
                            );

                            message.channel.send(`I have given ${Author} ${points} point(s) and marked that submission as reviewed! Thank you!`);
                        }
                    }
                }
        }    

    }
}