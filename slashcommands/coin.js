module.exports = {
    name: 'coinflip',
    description: 'Flip a coin and get heads or tails.',
    type: 'STRING',
    execute(interaction) {
        const coins = ["heads", "tails"];
        const coinz = coins[Math.floor(Math.random() * coins.length)];

        interaction.reply({ content: `I got \`${coinz}\`!`, allowedMentions: { repliedUser: false } });

    }
}