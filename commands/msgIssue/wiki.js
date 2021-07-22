module.exports = {
    name: 'wiki',
    description: 'Refers people to the wiki for their questions.',
    aliases: ['knowledgebase', 'kb', 'site'],
    usage: '++wiki',
    inHelp: 'yes',
    example: '++wiki or ++kb',
    userPerms: [''],
    botPerms: [''],
    execute(message) {
        
        message.channel.send('We aren\'t sure if you knew this, but we have a wiki! It answers a lot of the questions we get asked here! Check it out here: https://codinghelp.site/');
    },
    
  };