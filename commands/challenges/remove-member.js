const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'remove-user',
    description: 'This allows **mods** to manually remove users to the participants database. This makes it so they cannot submit answers to any of the challenges.',
    aliases: ['remove-people', 'removeuser'],
    usage: '/remove-user <tag user or ID>',
    options: [
        {
            name: 'mention',
            type: 'USER',
            required: true,
            description: 'Which user are you removing from the participants database?'
        }
    ],
    example: '/remove-user @DudeThatsErin',
    inHelp: 'yes',
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
    botPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
    execute(interaction) {
        const mmbr = interaction.options.getMentionable('mention'); //OLD STUFFS: message.mentions.members.first() || message.guild.members.cache.get(interaction.options.get('mention').value);
        // doubt these will work.
        const id = mmbr.user.id;
        const tag = mmbr.user.tag;
        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`User I have removed from the database`)
            .setDescription(`${tag}`)
            .setFooter('If this is wrong, please report this.');
        interaction.reply({ embeds: [embed], ephemeral: true });
        connection.query(
            `DELETE FROM Challenges WHERE guildId = ? AND player = ?;`,
            [interaction.guild.id, id]
        );

    }
}