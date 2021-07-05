module.exports = {
  name: 'ping',
  description: 'This displays a ping/pong command in a channel. Checks to see if the bot is alive.',
  aliases: ['beep', 'pong'],
  usage: 's.ping',
  inHelp: 'yes',
  example: 's.ping or s.beep',
  cooldown: 0,
  userPerms: ['SEND_MESSAGES'],
  botPerms: ['SEND_MESSAGES'],
  execute(message, args) {
    let days = Math.floor(message.client.uptime / 86400000);
    let hours = Math.floor(message.client.uptime / 3600000) % 24;
    let minutes = Math.floor(message.client.uptime / 60000) % 60;
    let seconds = Math.floor(message.client.uptime / 1000) % 60;

    message.channel.send(`🏓 Pong! I have been awake for ${days}d ${hours}h ${minutes}m ${seconds}s`);
  }
};