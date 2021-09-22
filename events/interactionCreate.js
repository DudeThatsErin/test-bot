const config = require('../config/config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return interaction.reply({ content: 'That is not a valid slash command.', ephermal: true });
        if (!client.commands.has(interaction.commandName)) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'This command no longer exists.', ephermal: true }) && client.commands.delete(interaction.commandName);

        // owner only
        if (command.ownerOnly === 'yes') {
            if (!interaction.user.id === config.developer.id) {
                return interaction.reply({ content: `This is only a command Erin (DudeThatsErin#8061) can use. If you are seeing this in error use the \`${prefix}report\` command.`, ephermal: true });
            }
        }

        // command cooldowns
        if (!cooldowns.has(interaction.commandName)) {
            cooldowns.set(interaction.commandName, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(interaction.commandName);
        const cooldownAmount = (interaction.commandName || 1) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${interaction.commandName}\` command.`, ephermal: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        const modRoles = ['780941276602302523', '822500305353703434', '718253309101867008', '751526654781685912'];
        const modIDs = ['732667572448657539', '455926927371534346', '541305895544422430'];
        const isMod = modIDs.reduce((alrdyGod, crr) => alrdyGod || interaction.content.toLowerCase().split(' ').includes(crr), false);
        let value = 0;
        if (interaction.channel.parentID === '382210817636040706') {
            for (const ID of modRoles) {
                if (!interaction.member.roles.cache.has(ID)) {
                    value++
                }
                if (value != modRoles.length && isMod) {
                    interaction.reply({ content: `Please do not ping the mods. If you need to contact them, please message <@575252669443211264> to open a ModMail ticket. Thank you!`, ephermal: true });
                }
            }
        }

        if (command.modOnly === 'yes') {
            for (const ID of modRoles) {
                if (!interaction.member.roles.cache.has(ID)) {
                    value++
                }

                if (value == modRoles.length) {
                    interaction.reply({ content: `This is a command only moderators can use. You do not have the required permissions. Moderators have the <@&${modRoles[0]}> role or <@&${modRoles[1]}> role or <@&${modRoles[2]}> role  or <@&${modRoles[3]}> role. Please run \`${config.bot.prefix}report [issue]\` if you are seeing this in error.`, ephermal: true });
                    return;
                }
            }
        }

        const chllMod = ['839863262026924083', '718253309101867008'];
        if (command.challengeMods === 'yes') {
            for (const ID of chllMod) {
                if (!interaction.member.roles.cache.has(ID)) {
                    value++
                }
                if (value == chllMod.length) {
                    interaction.reply({ content: `This is a command only challenge moderators can use. You do not have the required permissions. Challenge moderators have the <@&${chllMod[1]}> role. Please run \`${config.bot.prefix}report [issue]\` if you are seeing this in error.`, ephermal: true });
                    return;
                }
            }
        }

        // actually running the commands.
        try {
            await client.commands.get(interaction.commandName).execute(interaction, client);
        } catch (error) {
            console.error(error);
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Oh no! An _error_ has appeared!')
                .setDescription(`**Contact Bot Owner:** <@${config.bot.ownerID}>`)
                .addFields({
                    name: '**Error Name:**',
                    value: `\`${error.name}\``
                }, {
                    name: '**Error Message:**',
                    value: `\`${error.message}\``
                }, {
                    name: '**Error Location:**',
                    value: `\`${error.stack}\``
                }, {
                    name: '**Ways to Report:**',
                    value: `Run the \`${config.bot.prefix}report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                })
                .setTimestamp()
                .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`)
            interaction.reply({ embeds: [embed], ephermal: true });
        }
    }
};