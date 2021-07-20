const connection = require('/root/test/database.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'log-events',
    description: 'Displays all of the available events from Sakura Moon and advised whether they are enabled or disabled for your server.',
    aliases: ['auditlogevents', 'logevents', 'modlogevents', 'ale', 'mle'],
    usage: 's.log-events',
    inHelp: 'yes',
    example: 's.log-events',
    botPerms: ['MANAGE_MESSAGES'],
    userPerms: ['MANAGE_MESSAGES'],
    note: '',
    async execute(message, args, client) {
        const guil = message.guild.id;
        const results = await connection.query(
            `SELECT * FROM logs WHERE guildId = ?;`,
            [guil]
        );
        const item = results[0][0];
        console.log(item.guildMemberAdd == 0)

        let optionsEmbed = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle('Audit/Mod/Moderator Log Options')
            .setDescription('These are all of the options that Sakura Moon has available for the Audit Log system.\nThese options log what they name. If you do not understand you can [go here](https://codinghelp.site/knowledgebase/discord-bot/discord-js-audit-log-list/) and get a full description of these logs.\n\n**Server/Guild Log Options:**\n\`\`\`\nguildNameUpdated\nguildDescription\nguildFeatureAdded\nguildFeatureRemoved\nguildOwnershipTransferred\nguildPartnerUpdated\nguildVerifiedUpdated\nguildVerificationLevel\nguildMFAUpdated\nguildNSFWUpdated\nguildExplicitFilterUpdated\nguildNitroBoostCount\nguildNitroBoostTier\nguildVanityURL\nguildIconUpdated\nguildBannerUpdated\nguildSplashUpdated\nguildDefaultNotificationsUpdated\nguildPreferredLocaleUpdated\nguildAFKTimeoutUpdated\nguildAFKCHUpdated\nguildPublicUpdatesCHUpdated\nguildRulesCHUpdated\nguildSystemCHUpdated\nguildSystemCHFlagsUpdated\`\`\`\n**Member/User Log Options:**\`\`\`\nguildMemberAdd\nguildMemberNicknameUpdate\nguildMemberRemove\nguildBanAdd\nguildBanRemove\`\`\`\n**Channel Log Options:**\`\`\`\nchannelCreate\nchannelPinsUpdate\nchannelTypeUpdated\nchannelTopicUpdated\nchannelNSFW\nchannelSlowMode\nchannelBitRate\nchannelUserLimit\nchannelPermissionsSync\nchannelPermissionsOverwriteRemove\nchannelPermissionsOverwriteUpdated\`\`\`\n**Other Log Options:**\`\`\`warn\ninviteCreate\ninviteUsed\ninviteDelete\nroleCreate\nroleDelete\nguildMemberRoleGiven\nguildMemberRoleTaken\nroleNameUpdated\nroleColorUpdate\nroleHoistStateUpdated\nroleMentionableUpdated\nrolePermsUpdated\`\`\`')
            .setTimestamp()
            .setFooter('Thank you for using Sakura Moon!')
        message.channel.send(optionsEmbed);

        if (results[0][0].channelID === undefined || results[0][0].channelID === 'undefined') {
            let everythingDisabled = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('You have everything disabled.')
                .setDescription('If you would like to enable the audit log system, please use the \`s.audit-logs\` command if you are unsure how to use it run \`s.help audit-logs\`.')
                .setTimestamp()
                .setFooter('Thank you for using Sakura Moon!');
            message.channel.send(everythingDisabled);
            return;
        }
        const channel = client.channels.cache.get(results[0][0].channelID);
        let enabledOptions = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle('Enabled Options')
            .setDescription(`The channel that your audit logs are enabled on is ${channel}.\nYou have these options enabled:`)
            .setTimestamp()
            .setFooter('Thank you for using Sakura Moon!');
        
        let disabledOptions = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle('Disabled Options')
            .setDescription(`You have these options disabled:`)
            .setTimestamp()
            .setFooter('Thank you for using Sakura Moon!');
        
        if (item.guildMemberAdd === 0) {
            disabledOptions.addField(`Member Join`, 'guildMemberAdd', false);
            console.log('disabled')
        }
        if (item.guildMemberAdd === 1) {
            enabledOptions.addField(`Member Join`, 'guildMemberAdd', false);
            console.log('enabled')
        }

        if (item.guildMemberNicknameUpdate === 0) {
            disabledOptions.addField(`Member's Nickname Updated`, 'guildMemberNicknameUpdate', false);
        }
        if (item.guildMemberNicknameUpdate === 1) {
            enabledOptions.addField(`Member's Nickname Updated`, 'guildMemberNicknameUpdate', false);
        }

        if (item.guildMemberRemove === 0) {
            disabledOptions.addField(`Member Leave`, 'guildMemberRemove', false);
        }
        if (item.guildMemberRemove === 1) {
            enabledOptions.addField(`Member Leave`, 'guildMemberRemove', false);
        }

        if (item.guildBanAdd === 0) {
            disabledOptions.addField(`Member Banned`, 'guildBanAdd', false);
        }
        if (item.guildBanAdd === 1) {
            enabledOptions.addField(`Member Banned`, 'guildBanAdd', false);
        }

        if (item.guildBanRemove === 0) {
            disabledOptions.addField(`Ban Removed`, 'guildBanRemove', false);
        }
        if (item.guildBanRemove === 1) {
            enabledOptions.addField(`Ban Removed`, 'guildBanRemove', false);
        }

        if (item.guildNameUpdated === 0) {
            disabledOptions.addField(`Guild Name Updated`, 'guildNameUpdated', false);
        }
        if (item.guildNameUpdated === 1) {
            enabledOptions.addField(`Guild Name Updated`, 'guildNameUpdated', false);
        }

        if (item.guildDescriptionUpdated === 0) {
            disabledOptions.addField(`Guild Description Updated`, 'guildDescription', false);
        }
        if (item.guildDescriptionUpdated === 1) {
            enabledOptions.addField(`Guild Description Updated`, 'guildDescription', false);
        }

        if (item.guildFeatureAdded === 0) {
            disabledOptions.addField(`Guild Feature Added`, 'guildFeatureAdded', false);
        }
        if (item.guildFeatureAdded === 1) {
            enabledOptions.addField(`Guild Feature Added`, 'guildFeatureAdded', false);
        }

        if (item.guildFeatureRemoved === 0) {
            disabledOptions.addField(`Guild Feature Removed`, 'guildFeatureRemoved', false);
        }
        if (item.guildFeatureRemoved === 1) {
            enabledOptions.addField(`Guild Feature Removed`, 'guildFeatureRemoved', false);
        }

        if (item.guildOwnershipXferred === 0) {
            disabledOptions.addField(`Guild Ownership Transferred`, 'guildOwnershipTransferred', false);
        }
        if (item.guildOwnershipXferred === 1) {
            enabledOptions.addField(`Guild Ownership Transferred`, 'guildOwnershipTransferred', false);
        }

        if (item.guildPartnerUpdated === 0) {
            disabledOptions.addField(`Guild Partnership Status Updated`, 'guildPartnerUpdated', false);
        }
        if (item.guildPartnerUpdated === 1) {
            enabledOptions.addField(`Guild Partnership Status Updated`, 'guildPartnerUpdated', false);
        }

        if (item.guildVerifiedUpdated === 0) {
            disabledOptions.addField(`Guild Verified Status Updated`, 'guildVerifiedUpdated', false);
        }
        if (item.guildVerifiedUpdated === 1) {
            enabledOptions.addField(`Guild Verified Status Updated`, 'guildVerifiedUpdated', false);
        }

        if (item.guildVerificationLevel === 0) {
            disabledOptions.addField(`Guild Verification Level Updated`, 'guildVerificationLevel', false);
        }
        if (item.guildVerificationLevel === 1) {
            enabledOptions.addField(`Guild Verification Level Updated`, 'guildVerificationLevel', false);
        }

        if (item.guildMFAUpdated === 0) {
            disabledOptions.addField(`Guild Multi-Factor Authentication Updated`, 'guildMFAUpdated', false);
        }
        if (item.guildMFAUpdated === 1) {
            enabledOptions.addField(`Guild Multi-Factor Authentication Updated`, 'guildMFAUpdated', false);
        }

        if (item.guildNSFWUpdated === 0) {
            disabledOptions.addField(`Guild NSFW Status Updated`, 'guildNSFWUpdated', false);
        }
        if (item.guildNSFWUpdated === 1) {
            enabledOptions.addField(`Guild NSFW Status Updated`, 'guildNSFWUpdated', false);
        }

        if (item.guildExplicitFilterUpdated === 0) {
            disabledOptions.addField(`Guild Explicit Filter Updated`, 'guildExplicitFilterUpdated', false);
        }
        if (item.guildExplicitFilterUpdated === 1) {
            enabledOptions.addField(`Guild Explicit Filter Updated`, 'guildExplicitFilterUpdated', false);
        }

        if (item.guildNtroBoostCount === 0) {
            disabledOptions.addField(`Nitro Boost Count Updated`, 'guildNitroBoostCount', false);
        }
        if (item.guildNtroBoostCount === 1) {
            enabledOptions.addField(`Nitro Boost Count Updated`, 'guildNitroBoostCount', false);
        }

        if (item.guildNitroBoostTier === 0) {
            disabledOptions.addField(`Nitro Boost Tier Updated`, 'guildNitroBoostTier', false);
        }
        if (item.guildNitroBoostTier === 1) {
            enabledOptions.addField(`Nitro Boost Tier Updated`, 'guildNitroBoostTier', false);
        }

        if (item.guildVanityUrl === 0) {
            disabledOptions.addField(`Guild Vanity URL Updated`, 'guildNitroBoostTier', false);
        }
        if (item.guildVanityUrl === 1) {
            enabledOptions.addField(`Guild Vanity URL Updated`, 'guildNitroBoostTier', false);
        }

        if (item.guildIconUpdated === 0) {
            disabledOptions.addField(`Guild Icon Updated`, 'guildIconUpdated', false);
        }
        if (item.guildIconUpdated === 1) {
            enabledOptions.addField(`guild Icon Updated`, 'guildIconUpdated', false);
        }

        if (item.guildBannerUpdated === 0) {
            disabledOptions.addField(`Guild Bannder Updated`, 'guildBannerUpdated', false);
        }
        if (item.guildBannerUpdated === 1) {
            enabledOptions.addField(`Guild Banner Updated`, 'guildBannerUpdated', false);
        }

        if (item.guildSplashUpdated === 0) {
            disabledOptions.addField(`Guild Splash Image Updated`, 'guildSplashUpdated', false);
        }
        if (item.guildSplashUpdated === 1) {
            enabledOptions.addField(`Guild Splash Image Updated`, 'guildSplashUpdated', false);
        }

        if (item.guildDefaultNotifsUpdated === 0) {
            disabledOptions.addField(`Guild Default Notifications Preferences`, 'guildDefaultNotificationsUpdated', false);
        }
        if (item.guildDefaultNotifsUpdated === 1) {
            enabledOptions.addField(`Guild Default Notifications Preferences`, 'guildDefaultNotificationsUpdated', false);
        }

        if (item.guildPreferredLocaleUpdated === 0) {
            disabledOptions.addField(`Guild Preferred Locale Updated`, 'guildPreferredLocaleUpdated', false);
        }
        if (item.guildPreferredLocaleUpdated === 1) {
            enabledOptions.addField(`Guild Preferred Locale Updated`, 'guildPreferredLocaleUpdated', false);
        }

        if (item.guildAFKTimeoutUpdated === 0) {
            disabledOptions.addField(`Guild AFK Timeout Updated`, 'guildAFKTimeoutUpdated', false);
        }
        if (item.guildAFKTimeoutUpdated === 1) {
            enabledOptions.addField(`Guild AFK Timeout Updated`, 'guildAFKTimeoutUpdated', false);
        }

        if (item.guildAFKCHUpdated === 0) {
            disabledOptions.addField(`Guild AFK Channel Updated`, 'guildAFKCHUpdated', false);
        }
        if (item.guildAFKCHUpdated === 1) {
            enabledOptions.addField(`Guild AFK Channel Updated`, 'guildAFKCHUpdated', false);
        }

        if (item.guildPublicUpdatesCHUpdated === 0) {
            disabledOptions.addField(`Guild Public Updates Channel Updated`, 'guildPublicUpdatesCHUpdated', false);
        }
        if (item.guildPublicUpdatesCHUpdated === 1) {
            enabledOptions.addField(`Guild Public Updates Channel Updated`, 'guildPublicUpdatesCHUpdated', false);
        }

        if (item.guildRulesCHUpdated === 0) {
            disabledOptions.addField(`Guild Rules Channel Updated`, 'guildRulesCHUpdated', false);
        }
        if (item.guildRulesCHUpdated === 1) {
            enabledOptions.addField(`Guild Rules Channel Updated`, 'guildRulesCHUpdated', false);
        }

        if (item.guildSystemCHUpdated === 0) {
            disabledOptions.addFields(`Guild System Messages Channel Updated`, 'guildSystemCHUpdated', false);
        }
        if (item.guildSystemCHUpdated === 1) {
            enabled0Options.addFields(`Guild System Messages Channel Updated`, 'guildSystemCHUpdated', false);
        }

        if (item.guildSystemCHFlagsUpdated === 0) {
            disabledOptions.addField(`Guild System Channel Flags Updated`, 'guildSystemCHFlagsUpdated', false);
        }
        if (item.guildSystemCHFlagsUpdated === 1) {
            enabledOptions.addField(`Guild System Channel Flags Updated`, 'guildSystemCHFlagsUpdated', false);
        }

        if (item.channelCreate === 0) {
            disabledOptions.addField(`Channel Create`, 'channelCreate', false);
        }
        if (item.channelCreate === 1) {
            enabledOptions.addField(`Channel Create`, 'channelCreate', false);
        }

        if (item.channelDelete === 0) {
            disabledOptions.addField(`Channel Delete`, 'channelDelete', false);
        }
        if (item.channelDelete === 1) {
            enabledOptions.addField(`Channel Delete`, 'channelDelete', false);
        }

        if (item.channelPinsUpdate === 0) {
            disabledOptions.addField(`Channel Pins Updated`, 'channelPinsUpdate', false);
        }
        if (item.channelPinsUpdate === 1) {
            enabledOptions.addField(`Channel Pins Updated`, 'channelPinsUpdate', false);
        }

        if (item.channelTypeUpdated === 0) {
            disabledOptions.addField(`Channel Type Updated`, 'channelTypeUpdated', false);
        }
        if (item.channelTypeUpdated === 1) {
            enabledOptions.addField(`Channel Type Updated`, 'channelTypeUpdated', false);
        }

        if (item.channelTopicUpdated === 0) {
            disabledOptions.addField(`Channel Topic Updated`, 'channelTopicUpdated', false);
        }
        if (item.channelTopicUpdated === 1) {
            enabledOptions.addField(`Channel Topic Updated`, 'channelTopicUpdated', false);
        }

        if (item.channelNSFW === 0) {
            disabledOptions.addField(`Channel NSFW Status Updated`, 'channelNSFW', false);
        }
        if (item.channelNSFW === 1) {
            enabledOptions.addField(`Channel NSFW Status Updated`, 'channelNSFW', false);
        }

        if (item.channelSlowMode === 0) {
            disabledOptions.addField(`Channel Slow Mode Status Updated`, 'channelSlowMode', false);
        }
        if (item.channelSlowMode === 1) {
            enabledOptions.addField(`Channel Slow Mode Status Updated`, 'channelSlowMode', false);
        }

        if (item.channelBitRate === 0) {
            disabledOptions.addField(`Channel Bit Rate Status Updated`, 'channelBitRate', false);
        }
        if (item.channelBitRate === 1) {
            enabledOptions.addField(`Channel Bit Rate Status Updated`, 'channelBitRate', false);
        }

        if (item.channelUserLimit === 0) {
            disabledOptions.addField(`Channel User Limit Status Updated`, 'channelUserLimit', false);
        }
        if (item.channelUserLimit === 1) {
            enabledOptions.addField(`Channel User Limit Status Updated`, 'channelUserLimit', false);
        }

        if (item.channelPermissionsSync === 0) {
            disabledOptions.addField(`Channel Permissions Sync Status`, 'channelPermissionsSync', false);
        }
        if (item.channelPermissionsSync === 1) {
            enabledOptions.addField(`Channel Permissions Sync Status`, 'channelPermissionsSync', false);
        }

        if (item.channelPermissionsOverwriteAdded === 0) {
            disabledOptions.addField(`Channel Permissions Overwrite Added`, 'channelPermissionsOverwriteAdded', false);
        }
        if (item.channelPermissionsOverwriteAdded === 1) {
            enabledOptions.addField(`Channel Permissions Overwrite Added`, 'channelPermissionsOverwriteAdded', false);
        }

        if (item.channelPermissionsOverwriteRemove === 0) {
            disabledOptions.addField(`Channel Permissions Overwrite Removed`, 'channelPermissionsOverwriteRemove', false);
        }
        if (item.channelPermissionsOverwriteRemove === 1) {
            enabledOptions.addField(`Channel Permissions Overwrite Removed`, 'channelPermissionsOverwriteRemove', false);
        }

        if (item.channelPermissionsOverwriteUpdated === 0) {
            disabledOptions.addField(`Channel Permissions Overwrite Updated`, 'channelPermissionsOverwriteUpdated', false);
        }
        if (item.channelPermissionsOverwriteUpdated === 1) {
            enabledOptions.addField(`Channel Permissions Overwrite Updated`, 'channelPermissionsOverwriteUpdated', false);
        }

        if (item.inviteCreate === 0) {
            disabledOptions.addField(`Guild Invite Created`, 'inviteCreate', false);
        }
        if (item.inviteCreate === 1) {
            enabledOptions.addField(`Guild Invite Created`, 'inviteCreate', false);
        }

        if (item.inviteUsed === 0) {
            disabledOptions.addField(`Guild Invite Used`, 'inviteUsed', false);
        }
        if (item.inviteUsed === 1) {
            enabledOptions.addField(`Guild Invite Used`, 'inviteUsed', false);
        }

        if (item.inviteDelete === 0) {
            disabledOptions.addField(`Guild Invite Deleted`, 'inviteDelete', false);
        }
        if (item.inviteDelete === 1) {
            enabledOptions.addField(`Guild Invite Deleted`, 'inviteDelete', false);
        }

        if (item.roleCreate === 0) {
            disabledOptions.addField(`Role Created`, 'roleCreate', false);
        }
        if (item.roleCreate === 1) {
            enabledOptions.addField(`Role Created`, 'roleCreate', false);
        }

        if (item.roleDelete === 0) {
            disabledOptions.addField(`Role Deleted`, 'roleDelete', false);
        }
        if (item.roleDelete === 1) {
            enabledOptions.addField(`Role Deleted`, 'roleDelete', false);
        }

        if (item.guildMemberRoleGiven === 0) {
            disabledOptions.addField(`Member Role Given`, 'guildMemberRoleGiven', false);
        }
        if (item.guildMemberRoleGiven === 1) {
            enabledOptions.addField(`Member Role Given`, 'guildMemberRoleGiven', false);
        }

        if (item.guildMemberRoleTaken === 0) {
            disabledOptions.addField(`Member Role Taken`, 'guildMemberRoleTaken', false);
        }
        if (item.guildMemberRoleTaken === 1) {
            enabledOptions.addField(`Member Role Taken`, 'guildMemberRoleTaken', false);
        }

        if (item.roleNameUpdated === 0) {
            disabledOptions.addField(`Role Name Updated`, 'roleNameUpdated', false);
        }
        if (item.roleNameUpdated === 1) {
            enabledOptions.addField(`Role Name Updated`, 'roleNameUpdated', false);
        }

        if (item.roleColorUpdated === 0) {
            disabledOptions.addField(`Role Color Updated`, 'roleColorUpdate', false);
        }
        if (item.roleColorUpdated === 1) {
            enabledOptions.addField(`Role Color Updated`, 'roleColorUpdate', false);
        }

        if (item.roleHoistStateUpdated === 0) {
            disabledOptions.addField(`Role Hoist State Updated`, 'roleHoistStateUpdated', false);
        }
        if (item.roleHoistStateUpdated === 1) {
            enabledOptions.addField(`Role Hoist State Updated`, 'roleHoistStateUpdated', false);
        }

        if (item.roleMentionableUpdated === 0) {
            disabledOptions.addField(`Role Mentionable Status Updated`, 'roleMentionableUpdated', false);
        }
        if (item.roleMentionableUpdated === 1) {
            enabledOptions.addField(`Role Mentionable Status Updated`, 'roleMentionableUpdated', false);
        }

        if (item.rolePermsUpdated === 0) {
            disabledOptions.addField(`Role Permissions Updated`, 'rolePermsUpdated', false);
        }
        if (item.rolePermsUpdated === 1) {
            enabledOptions.addField(`Role Permissions Updated`, 'rolePermsUpdated', false);
        }

        message.channel.send(enabledOptions);
        
        message.channel.send(disabledOptions);
        
        
        
    }
}