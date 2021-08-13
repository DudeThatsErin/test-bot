const config = require('../config.json');

module.exports = {
    name: 'slash-deploy',
    aliases: ['deploy', 'setup', 'update'],
    inHelp: 'no',
    challengeMods: 'no',
    modOnly: 'no',
    ownerOnly: 'yes',
    userPerms: [''],
    botPerms: [''],
    async execute(message, args, client) {

        const commands = [
            {
                name: 'ping',
                description: 'Makes sure the bot is online.',
            },
            {
                name: 'report',
                description: 'Allows users to report issues with the bot.',
                options: [
                    {
                        name: 'issue',
                        type: 'STRING',
                        description: 'Please let Erin know what your issue is.',
                        required: true,
                    }
                ],
            },
            {
                name: 'suggestion',
                description: 'Allows users to check on the status of their Suggestion.',
                options: [
                    {
                        name: 'suggestion-message',
                        type: 'STRING',
                        description: 'What would you like to suggest?',
                        required: true,
                    }
                ],
            },
            {
                name: 'mod-check-submissions',
                description: 'Allows mods to check what users have submitted to the challenge system.',
                options: [
                    {
                        name: 'challenge-number',
                        type: 'STRING',
                        description: 'Please provide the challenge number that you would like to check.',
                        required: true,
                    }
                ],
            },
            {
                name: 'user-check-submissions',
                description: 'Allows users to check what they have submitted to the challenge system.',
                options: [
                    {
                        name: 'challenge-number',
                        type: 'STRING',
                        description: 'Please provide the challenge number that you would like to check.',
                        required: true,
                    }
                ],
            },
            {
                name: 'reviewed',
                description: 'Allows mods to mark submissions as reviewed.',
                options: [
                    {
                        name: 'points',
                        type: 'INTEGER',
                        description: 'Please provide the the amount of points to award.',
                        required: true,
                    },
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Please provide the message ID for the submission you would like to review.',
                        required: true,
                    }
                ],
            },
        ];

        message.react('✔️')
        const slash = await client.guilds.cache.get(config.bot.testServerId)?.commands.set(commands);
        console.log(slash);

    }
}