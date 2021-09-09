const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'remove-submissions',
    description: 'This allows **mods** to remove responses to challenges.',
    usage: '/remove-submissions [message ID]',
    options: [
        {
            name: 'message-id',
            type: 'STRING',
            required: true,
            description: 'Please enter the message ID you want to remove from the database.'
        }
    ],
    example: '/remove-submissions 841301824115965952',
    inHelp: 'yes',
    modOnly: 'yes',
    userPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS'],
    botPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS'],
    challengeMods: 'yes',
    async execute(interaction) {
        let name = interaction.user.id;
        const modname = await interaction.client.users.fetch(name).catch(err => { console.log(err); });
        let submission = interaction.options.get('message-id').value;

        const results = await connection.query(
            `SELECT * FROM Submissions WHERE msgId = ? AND guildId = ?;`,
            [submission, message.guild.id]
        )
        const player = results[0][0].author;
        const user = await message.client.users.fetch(player).catch(err => { console.log(err); });
        const username = user.username;
        const Submissions = results[0][0].message;
        const dayNo = results[0][0].challengeNo;

        const embed = new Discord.MessageEmbed()
            .setColor('#d4a066')
            .setTitle(`The submission by ${username} for Challenge ${dayNo} has been removed.`)
            .setDescription(`Their submission is as follows:\n${Submissions}\n\nThe moderator that removed it was: ${modname}.`)
            .setFooter('If there is a problem with this, please report this!');

        message.channel.send({ embeds: [embed], ephemeral: true });

        await connection.query(
            `DELETE FROM Submissions WHERE msgId = ? AND guildId = ?;`,
            [submission, interaction.guild.id]
        );
    }
}