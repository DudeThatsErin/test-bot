module.exports = {
  name: 'mods',
  description: 'Refers people to Modmail bot and asks them not to ping the mods.',
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
    usr.send(`Hey, ${usr}!` + ' Rule 4 states: Please do not ping or message the mods directly. If you would like to contact the mods, please message <@575252669443211264> and we will get back to you shortly.');
    interaction.reply({ content: `📨 I just sent that user a direct message asking the user to not ping the mods.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });
  },

};