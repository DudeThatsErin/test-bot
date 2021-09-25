module.exports = {
    name: 'wiki',
    description: 'Sends you a link to our wiki/knowledgebase.',
    execute(interaction) {

        interaction.reply({ content: 'You wanted a link to our knowledgebase/wiki? Check it out here: https://codinghelp.site/\nIt has tons of tutorials and pages on how to do very basic coding.If you are interesting in writing a few articles for us, you can join the team via the link. Have a good day/evening/night, wherever you are in the world!' });
    },

};