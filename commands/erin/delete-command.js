module.exports = {
    name: 'delete-command',
    description: 'Allows Erin to delete a slash command.',
    ownerOnly: 'yes',
    execute(message, args, client) {

        message.guild.commands.delete('891028460254953594');
        message.react('✅')
    }
}