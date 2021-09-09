const Discord = require('discord.js');
const connection = require('../../database.js');


module.exports = {
    name: 'clear-points',
    description: 'This gives **mods** the ability to mark a submission as unreviewed.',
    aliases: ['clearpoints', 'cp'],
    usage: '/clear-points [message ID]',
    options: [
        {
            name: 'message-id',
            required: true,
            type: 'STRING',
        }
    ],
    example: '/clear-points 841330343641874532',
    inHelp: 'yes',
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: [''],
    botPerms: [''],
    async execute(interaction) {

        let msgId = args[0];
        let author = message.author.username;
        let name = message.author.id;


        let embed = new Discord.MessageEmbed()
            .setColor('#c9a066')
            .setTitle(`I have removed all points from ${player}! Their submission is not unreviewed.`)
            .setDescription(`Thank you for that, ${author}!`)
            .setFooter('If there is a problem with this, please report it!');

        connection.query(
            `UPDATE Submissions SET mod = ? AND points = ? WHERE msgId = ?;`,
            [NULL, NULL, msgId]
        );
        interaction.client.users.cache.get(`${name}`).send({ embeds: [embed] });
        interaction.reply({ content: '📨 I have sent you a private message.', ephermal: true })


    }
}