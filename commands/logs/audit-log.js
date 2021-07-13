const connection = require('../../database.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'audit-log',
  description: 'Allows **mods** to store the channel ID for audit/moderation logs. You must run this before the audit log system will work.',
  aliases: ['auditlog', 'log', 'modlog', 'al', 'ml'],
  usage: 's.audit-log [channel ID] [selection of audit logs to turn on or the word all]',
  inHelp: 'yes',
  example: 's.audit-log 825856708592009216 invite logs, join logs, leave logs or s.audit-log 825856708592009216 all',
  botPerms: ['MANAGE_MESSAGES'],
  userPerms: ['MANAGE_MESSAGES'],
  note: 'You can turn on whatever logs you would like to. Just put it after the channel ID. If you put all after the channel ID you will turn on all audit logs.',
  patreonOnly: 'yes',
  execute (message, args, client) {

    let gd = message.guild.id;
    let logCH = args[0];
    let logs = args.slice(1).join(' ').split(',');

    if (!args[0]) {
      message.reply('You need to include the channel ID for these audit logs.');
      return;
    }

    let optionsEmbed = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle('Audit/Mod/Moderator Log Options')
      .setDescription('It looks like you have not specified the type of audit/mod/moderator logs you would like to turn on/off. If you would like to enable any of these options, please try the command again.\nThese options log what they name. If you do not understand you can [go here](https://codinghelp.site/knowledgebase/discord-bot/discord-js-audit-log-list/) and get a full description of these logs.\n\n**Server/Guild Log Options:**\n\`\`\`guildNameUpdated\nguildDescription\nguildFeatureAdded\nguildFeatureRemoved\nguildOwnershipTransferred\nguildPartnerUpdated\nguildVerifiedUpdated\nguildVerificationLevel\nguildMFAUpdated\nguildNSFWUpdated\nguildExplicitFilterUpdated\nguildNitroBoostCount\nguildNitroBoostTier\nguildVanityURL\nguildIconUpdated\nguildBannerUpdated\nguildSplashUpdated\nguildDefaultNotificationsUpdated\nguildPreferredLocaleUpdated\nguildAFKTimeoutUpdated\nguildAFKCHUpdated\nguildPublicUpdatesCHUpdated\nguildWidgetCHUpdated\nguildSystemCHFlagsUpdated\`\`\`\n**Member/User Log Options:**\`\`\`guildMemberAdd\nguildMemberNicknameUpdate\nguildMemberRemove\nguildBanAdd\nguildBanRemove\`\`\`\n**Channel Log Options:**\`\`\`channelCreate\nchannelPinsUpdate\nchannelTypeUpdated\nchannelTopicUpdated\nchannelNSFWUpdated\nchannelSlowModeUpdated\nchannelBitRateUpdated\nchannelUserLimitUpdated\nchannelPermissionsSync\nchannelPermissionsOverwriteRemove\nchannelPermissionsOverwriteUpdated\`\`\`\n**Other Log Options:**\`\`\`warn\ninviteCreate\ninviteUsed\ninviteDelete\nroleCreate\nroleUpdate\nroleDelete\nguildMemberRoleGiven\nguildMemberRoleTaken\nroleNameUpdated\nroleColorUpdate\nroleHoistStateUpdated\nroleMentionableUpdated\nrolePermsUpdated\`\`\`')
      .setTimestamp()
      .setFooter('Thank you for using Sakura Moon!')

    if (!args[1]) {
      message.reply(optionsEmbed);
      return;
    }

    if (logs == 'all') {
      message.reply('I have turned on all of the options for the audit log system. Everything will be logged.');
    }
    else {
      message.reply(`I heard \`${logs}\`.`)
    }
    

  }
}