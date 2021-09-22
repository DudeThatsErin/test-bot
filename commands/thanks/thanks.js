const connection = require('../../database.js');

module.exports = {
  name: 'thanks',
  aliases: ['thnks', 'tks', 'tx', 'thank'],
  usage: '++thanks <@username or ID>',
  inHelp: 'yes',
  cooldown: 400,
  mentionCooldown: 400,
  example: '++thanks @DudeThatsErin#8061 or ++thanks 455926927371534346',
  userPerms: [''],
  botPerms: [''],
  async execute(message, args, client) {
    const mention = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    const thankee = mention.id;
    const thanker = message.author.id;

    if (!mention) {
      message.react('❓');
      message.reply('Please tag a user to thank.');
      return;
    }

    if (mention.user.bot === true || thankee === message.author.id || thankee === client.user.id) {
      message.reply('It looks like you were trying to thank yourself or a bot in your server. That is not the appropriate way to use this system.');
      return;
    }

    await connection.query(
      `INSERT INTO Thanks (userId, user, thanks) VALUES (?, ?, ?);`,
      [thanker, thankee, 1]
    );

    const results = await connection.query(
      `select sum(cast(thanks as unsigned)) as total from Thanks where user = ?;`,
      [thankee]
    );
    const no = results[0][0].total;

    message.reply(`You thanked ${mention.user.username}! They now have ${no} thanks. Use the \`++thanks-leaderboard\` command to see where you stand.`)

  }
}
