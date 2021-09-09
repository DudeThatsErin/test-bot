const Discord = require('discord.js');
const connection = require('../../database.js');


module.exports = {
    name: 'edit-challenge',
    description: 'This gives **mods** the ability to edit the challenge questions that get asked.',
    usage: '/edit-challenge [message ID] <new question> ',
    options: [
        {
            name: 'message-id',
            required: true,
            type: 'STRING',
            description: 'What challenge message are you modifying?'
        },
        {
            name: 'new',
            required: true,
            type: 'STRING',
            description: 'What would you like to say instead of the question that was asked?'
        }
    ],
    example: '/edit-challenge 12345678910111213 What is your favourite colour?',
    challengeMods: 'yes',
    modOnly: 'yes',
    userPerms: ['SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'ATTACH_FILES', 'EMBED_LINKS', 'ADD_REACTIONS'],
    botPerms: ['SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'ATTACH_FILES', 'EMBED_LINKS', 'ADD_REACTIONS'],
    async execute(interaction, message) {
        let title = interaction.options.get('new').value;

        const result = await connection.query(
            `SELECT * FROM Challenge WHERE guildId = ?;`,
            [interaction.guild.id]
        );
        const msgId = result[0][0].msgId;
        const ch = result[0][0].channelD;
        const day = result[0][0].challengeNo; // I think? I may need to check this and update the challengeNo section
        const channel = intreaction.guild.channels.cache.find(c => c.id === `${ch}`);

        connection.query(
            `UPDATE Challenge SET title = ? WHERE msgId = ? AND guildId = ?`,
            [title, msgId, interaction.guild.id]
        );

        let embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`Challenge ${day}`)
            .setDescription(`${title}`)
            .setFooter('Run the /submit slash command to submit answers to this challenge.');

        channel.messages.fetch(msgId).then(message => {
            if (message) message.edit({ embeds: [embed] });
        });

        interaction.reply({ content: '✅ I have updated the question.', ephermal: true })



    }
}