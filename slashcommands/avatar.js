const ee = require('../config/embed.json');

module.exports = {
    description: 'Allows users to see other users avatars in a big form.',
    name: "avatar",
    type: 'STRING',
    async execute(interaction) {
        let user = intearction.author;
        let avs = new MessageEmbed()
            .setAuthor(
                `Avatar from: ${user.tag}`,
                user.displayAvatarURL({ dynamic: true }),
                "https://discord.gg/geQEUBm"
            )
            .setColor(ee.rand_color)
            .addField(
                "❱ PNG",
                `[\`LINK\`](${user.displayAvatarURL({ format: "png" })})`,
                true
            )
            .addField(
                "❱ JPEG",
                `[\`LINK\`](${user.displayAvatarURL({ format: "jpg" })})`,
                true
            )
            .addField(
                "❱ WEBP",
                `[\`LINK\`](${user.displayAvatarURL({ format: "webp" })})`,
                true
            )
            .setURL(
                user.displayAvatarURL({
                    dynamic: true,
                })
            )
            .setFooter(ee.footertext, ee.footericon)
            .setImage(
                user.displayAvatarURL({
                    dynamic: true,
                    size: 512,
                })
            );

        interaction.reply({ embeds: [avs], ephermal: true })
    },

};