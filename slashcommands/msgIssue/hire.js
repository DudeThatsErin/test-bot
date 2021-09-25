module.exports = {
  name: 'requests',
  description: 'Refers people to the request-coders channel to hire someone.',
  options: [
    {
      name: 'user',
      description: 'Who are you sending this to? ID ONLY.',
      required: true,
      type: 6
    }
  ],
  execute(interaction) {
    let usr = interaction.options.getUser('user');
    usr.send(`Hey, ${usr}!` + ' It looks like you are requesting for someone to help you individually. This question is better answered at <#756992144170024991>. Please repost it there.');
    interaction.reply({ content: `📨 I just sent that user a direct message about using the <#756992144170024991> channel.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });

  },

};