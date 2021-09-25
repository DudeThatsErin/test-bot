const Discord = require('discord.js');

module.exports = {
  name: 'error',
  description: 'Tells users how to read error messages.',
  options: [
    {
      name: 'user',
      description: 'Who are you sending this to? ID ONLY.',
      required: true,
      type: 6
    }
  ],
  execute(intearction) {

    const user = interaction.options.getUser('user');
    user.send(`Hey, ${user}, It looks like you have a question about an error message you received with your code. If you check out the following tutorial, it can teach you how to read error messages that you receive.\nhttps://codinghelp.site/knowledgebase/faq/how-do-i-read-this-error-message/`);
    interaction.reply({ content: `📨 I just sent that user a direct message about reading error messages.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });

  }

};