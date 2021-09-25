module.exports = {
  name: 'wrong-channel',
  description: 'Tells people to ask in a different channel as the channel their in is the wrong one.',
  note: 'You must provide the user\'s ID to use this command.',
  options: [
    {
      name: 'user',
      description: 'Who are you sending this to? ID ONLY.',
      required: true,
      type: 6
    }
  ],
  execute(interaction) {
    interaction.options.getUser('user');

    interaction.reply({ content: `📨 I sent the DM to the user!`, ephemeral: true })
    user.send({ content: `Hey, ${user}!` + ' This isn\'t the correct channel for your question. Please check our channel list on the left and ask repost in a different channel. Thank you!' });
    interaction.reply({ content: `📨 I just sent that user a direct message telling them they are in the wrong channel.\nThey will not receive it if their DMs are closed so please check the user's roles.`, ephemeral: true });
  },

};