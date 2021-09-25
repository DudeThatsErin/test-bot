module.exports = {
    name: 'reddit',
    description: 'Refers user to our Subreddit for additional coding help.',
    type: 'STRING',
    execute(interaction) {

        interaction.reply({ content: 'Hey! Not sure if you knew this but you can visit our Subreddit for additional help. You can go here to visit it: https://reddit.com/r/CodingHelp', ephermal: true });
    },

};