module.exports = {
    name: 'rolldie',
    description: 'Rolls a die that you specify.',
    note: 'if you just run d!roll, it rolls a 6-sided die by default.',
    options: [
        {
            name: 'sides',
            description: 'What sided die did you want to roll? 6? 20? etc.',
            type: 'INTEGER',
            required: true,
        }
    ],
    type: 'INTEGER',
    execute(interaction) {
        const messageWords = interaction.options.get('sides').split(' ');

        if (messageWords.length === 1) {
            return interaction.reply({
                content: `You rolled a... \`` +
                    (Math.floor(Math.random() * 6) + 1) + '\`!', allowedMentions: { repliedUser: false }
            });
        }
        let sides = messageWords[1];
        let rolls = 1;
        if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
            rolls = messageWords[1].split('d')[0] / 1;
            sides = messageWords[1].split('d')[1];
        } else if (messageWords[1][0] == 'd') {
            sides = sides.slice(1);
        }
        sides = sides / 1; // convert to number
        if (isNaN(sides) || isNaN(rolls)) {
            return;
        }
        if (rolls > 1) {
            const rollResults = [];
            for (let i = 0; i < rolls; i++) {
                rollResults.push(Math.floor(Math.random() * sides) + 1);
            }
            const sum = rollResults.reduce((a, b) => a + b);
            return interaction.reply({ content: `You rolled... \`${rollResults.toString()}\``, allowedMentions: { repliedUser: false } });
        } else {
            return interaction.reply({
                content: `You rolled... \`` +
                    (Math.floor(Math.random() * sides) + 1) + '\`!', allowedMentions: { repliedUser: false }
            });
        }
    }
}