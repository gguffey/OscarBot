const { SlashCommandBuilder } = require("discord.js");
const { BOT_CHANNEL_ID } = require("../../../constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription(
      "Skips a song or leaves the voice channel if the queue is empty"
    ),
  async execute(interaction, client) {
    interaction
      .reply({ content: "...", fetchReply: true })
      .then((message) => message.delete())
      .catch(console.error);

    const queue = client.DisTube.getQueue(interaction);
    if (!queue) {
      return interaction.channel.send(
        "There is nothing in the queue right now"
      );
    }

    try {
      await queue.skip();
      client.channels.cache
        .get(BOT_CHANNEL_ID)
        // combine embeds
        .send("Skipped song!");
    } catch (error) {
      client.DisTube.voices.leave(interaction);
    }
  },
};
