/* 
  CODINGHELP BOT
  USING DISCORD.JS V13.1.0
*/
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS
  ], });

// configurations
const config = require('./config/config.json');
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const { cooldowns } = client;
let connection;

console.log('|-----------------------------------|');
console.log('     Loading Command Files...        ');
console.log('|-----------------------------------|');
function readFilesFromPath(pathString) {
  const directoryEntries = fs.readdirSync(pathString, { withFileTypes: true });

  return directoryEntries.reduce((filteredEntries, dirEnt) => {
    if (dirEnt.isDirectory()) {
      // If the entry is a directory, call this function again
      // but now add the directory name to the path string.
      filteredEntries.push(...readFilesFromPath(`${pathString}/${dirEnt.name}`))
    } else if (dirEnt.isFile()) {
      // Check if the entry is a file instead. And if so, check
      // if the file name ends with `.js`.
      if (dirEnt.name.endsWith('.js')) {
        // Add the file to the command file array.
        filteredEntries.push(`${pathString}/${dirEnt.name}`);
      }
    }

    return filteredEntries;
  }, []);
}

// Call the read files function with the root folder of the commands and
// store all the file paths in the constant.
const commandFilePaths = readFilesFromPath('./commands');

// Loop over the array of file paths and set the command on the client.
commandFilePaths.forEach((filePath) => {
  const command = require(filePath);

  client.commands.set(command.name, command);
  console.log(command.name + ' loaded successfully!');
});


// create slash commands
let data = [];
console.log('|-----------------------------------|')
console.log('      Loading Slash Commands...      ')
console.log('|-----------------------------------|')
function readFilesFromPath(pathString) {
  const directoryEntries = fs.readdirSync(pathString, { withFileTypes: true });

  return directoryEntries.reduce((filteredEntries, dirEnt) => {
    if (dirEnt.isDirectory()) {
      // If the entry is a directory, call this function again
      // but now add the directory name to the path string.
      filteredEntries.push(...readFilesFromPath(`${pathString}/${dirEnt.name}`))
    } else if (dirEnt.isFile()) {
      // Check if the entry is a file instead. And if so, check
      // if the file name ends with `.js`.
      if (dirEnt.name.endsWith('.js')) {
        // Add the file to the command file array.
        filteredEntries.push(`${pathString}/${dirEnt.name}`);
      }
    }

    return filteredEntries;
  }, []);
}

const commandFilePaths1 = readFilesFromPath('./slashcommands');

commandFilePaths1.forEach((filePath) => {
  const cmd = require(filePath);

  let object = {};
  if (cmd.name) { object.name = cmd.name; }
  if (cmd.description) { object.description = cmd.description; }
  if (cmd.options) { object.options = cmd.options; }

  data.push(object);
  client.commands.set(cmd.name, cmd);
  console.log(cmd.name + ' loaded successfully!');
});


// end of file
(async () => {
  connection = await require('./database.js');
  await client.login(config.bot.token);
  await client.guilds.cache.get(config.bot.testServerId)?.commands.set(data);
})();


// saved stuff as it doesn't work currently but I will get it to work later.
/* setting up the ghost-ping detectors! 
Does not work in DJS13.
client.on('messageDelete', message => {
  GhostPing.detector("messageDelete", message, {
    channel: `450906618234929152`,
    ignorePerms: ['ADMINISTRATOR', 'MANAGE_MESSAGES']
  })
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  GhostPing.detector('messageUpdate', oldMessage, newMessage)
});
*/

  /* All Cooldowns
  const mention = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])).id;
  const thanker = message.author.id;
  
  client.mentionCooldown = new Discord.Collection();
const { mentionCooldown } = client;

   mention cooldown
  if (!mentionCooldown.has(`${thanker}-${thankee}`)) {
    mentionCooldown.set(`${thanker}-${thankee}`, new Discord.Collection());
  }

  const times = mentionCooldown.get(`${thanker}-${thankee}`);
  const mentionAmount = (command.mentionCooldown || 1) * 1000;

  if (times.has(message.author.id)) {
    const expireTime = times.get(`${thanker}`) + mentionAmount;
    
    if (now < expireTime) {
      const keepWaiting = (expireTime - now) / 1000;
      return message.reply(`Please wait ${keepWaiting.toFixed(1)} more second(s) before mentioning \`<@${thankee}>\` using \`${command.name}\` again.`)
    }
  }

  times.set(`${thanker}-${thankee}`, now);
  setTimeout(() => times.delete(`${thanker}-${thankee}`), mentionAmount);
*/