const Discord = require('discord.js');
const connection = require('../../database.js');


module.exports = {
    name: 'start-challenge',
    description: 'This gives **mods** the ability to start a challenge by storing the prizes for 1st, 2nd and 3rd place as well as the announcements channel ID.',
    aliases: ['sc', 'start', 'startchallenge', 'startc', 'startchall'],
    usage: '/start-challenge [announcements channel ID] [prize 1|prize 2|prize 3]',
    options: [
        {
            name: 'announcements-id',
            required: true,
            type: 'STRING',
            description: 'Please enter the channel ID for the channel you want the challenge announcements to be sent to.'
        },
        {
            name: 'first-place',
            required: true,
            type: 'STRING',
            description: 'What do you want to award for first place?'
        },
        {
            name: 'second-place',
            required: true,
            type: 'STRING',
            description: 'What do you want to award for second place?'
        },
        {
            name: 'third-place',
            required: true,
            type: 'STRING',
            description: 'What do you want to award for third place?'
        }
    ],
    example: '/start-challenge 841366694948765786 Nitro Nitro Classic Special Role',
    inHelp: 'yes',
    userPerms: ['SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
    botPerms: ['SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
    modOnly: 'yes',
    challengeMods: 'yes',
    async execute(interaction) {
        let guild = interaction.guild.id;
        let mod = interaction.user.id;
        let prize1 = intearction.options.get('first-place').value;
        let prize2 = interaction.options.get('second-place').value;
        let prize3 = interaction.options.get('third-place').value;
        let announcements = interaction.options.get('announcements-id')

        const rules = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Our Challenge has started!`)
            .setDescription('If you would like to participate, please check out the <#703989632110690324> channel to get the \`Participants\` role. Please read our rules, they explain how to use our challenge system!')
            .addFields(
                { name: 'Commands', value: 'These are the commands you can use with our system.\n\`++submit [challenge number] [answer]\` - This is how you submit answers to our challenges.\n\`++leaderboard\` - This is how you check the leaderboard for the challenge. It displays the top 10 users.\n\`++edit-submission\` - This is how you edit your submission for the challenge. You can only edit it until it has been reviewed. Once a submission has been reviewed, you may not edit it.' },
                { name: 'Rules', value: '1. Please be courteous to our fellow participants. Being rude, degrading, etc. will get you disqualified from the challenge.\n2. Please only submit once to each challenge. Multiple submissions can and will cause issues.' },
                { name: 'Prizes', value: `🥇 First Place: ${prize1}\n🥈 Second Place: ${prize2}\n🥉 Third Place: ${prize3}` }
            )
            .setFooter('Thanks for participating in our challenge! Good luck!');
        interaction.guild.channels.cache.get(announcements).send({ embeds: [rules] });

        const msg = interaction.id;
        connection.query(
            `INSERT INTO Challenge (guildId, msgId, channelD, moderator, prize1, prize2, prize3) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [guild, msg, announcements, mod, prize1, prizes2, prizes3]
        );

        interaction.reply('✅ I have sent the announcement! Check the channel!');

    }
}