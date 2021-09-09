const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'remove-points',
    description: 'This allows **mods** to automatically remove points from a participant\'s challenge in the Challenges database.',
    usage: '/remove-points <message ID> <number of points>',
    options: [
        {
            name: 'message-id',
            type: 'STRING',
            required: true,
            description: 'What message are you removing points from? Please give me the message ID.'
        },
        {
            name: 'points',
            type: 'STRING',
            required: true,
            description: 'How many points are we removing?'
        }
    ],
    inHelp: 'yes',
    example: '/remove-points 850726247050903562 3',
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    botPerms: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'VIEW_CHANNEL', 'EMBED_LINKS'],
    async execute(interaction) {

        let msgId = interaction.options.get('message-id').value;
        let author = interaction.user.username;
        let name = interaction.user.id;
        let points = interaction.options.get('points').value;
        const results = await connection.query(
            `SELECT * FROM Submissions WHERE msgId = ?;`,
            [msgId]
        );
        let player = results[0][0].author;
        let playerID = await interaction.client.users.fetch(player).catch(err => { console.log(err); });
        let playerName = playerID.username;

        let embed = new Discord.MessageEmbed()
            .setColor('#c9a066')
            .setTitle(`I have removed ${points} points from ${playerName}!`)
            .setDescription(`Thank you for that, ${author}!`)
            .setFooter('If there is a problem with this, please report it!');

        connection.query(
            `UPDATE Submissions SET moderator = ?, points = points - ? WHERE msgId = ?;`,
            [name, points, msgId]
        );
        interaction.reply({ embeds: [embed], ephemeral: true });


    }
}