/*
	ERIN'S TESTING BOT
	RUNNING DJS 12.5.3

	CURRENT ISSUE:
		NO ISSUE
	
	CURRENTLY ADDING:
		eventFiles
		new command handler
*/
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

// configurations
const config = require('./config.json');

// commands
console.log('|-----------------------------------|')
console.log('     Loading Command Files...        ')
console.log('|-----------------------------------|')
client.commands = new Discord.Collection();
const categories = fs.readdirSync(`${__dirname}/commands/`);
for (const category of categories) {
	const commandFiles = fs.readdirSync(`${__dirname}/commands/${category}`).filter(File => File.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`${__dirname}/commands/${category}/${file}`);
		client.commands.set(command.name, command);
	}
}


// events
console.log('|-----------------------------------|')
console.log('       Loading Event Files...        ')
console.log('|-----------------------------------|')
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`${__dirname}/events/${file}`);
	if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
	else client.on(event.name, (...args) => event.execute(...args, client));
	console.log(event.name + ' loaded successfully!');
}

// end of file
client.login(config.client.token);