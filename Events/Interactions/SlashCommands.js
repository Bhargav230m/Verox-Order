const {
  Client,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const cooldown = new Set(); //Defines a set
const config = require("../../config.json");
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isModalSubmit()) {
      if (customId == "developerModal") {
        if (!channel) return console.log("Not working lmo");
        const a = interaction.fields.getTextInputValue("a") || undefined;
        const b = interaction.fields.getTextInputValue("b") || undefined;
        const c =
          interaction.fields.getTextInputValue("c") || "Not specified (Sys)";

        interaction.reply({
          content: `Sent announcement in this channel`,
          ephemeral: true,
        });

        const embed = new EmbedBuilder()
          .setAuthor({
            name: "New Announcement",
            iconURL: user.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(`${b}`)
          .addFields(
            { name: "Announcer", value: a, inline: false },
            { name: "Honrable Strings", value: c, inline: false }
          )
          .setColor("Green");
        interaction.channel.send({ embeds: [embed] });
      }
    }
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command)
      return interaction.reply({
        content: "This command was not found",
        ephemeral: true,
      });

    const userId = interaction.user.id; //getting the user id

    if (command.developer && interaction.user.id !== "890255508693454929")
      return interaction.reply({
        content: "This commands is only available to developers",
        ephemeral: true,
      });

    const cooldowns = await command.Cooldown;
    if (command.Cooldown && cooldown.has(userId)) {
      const Embed = new EmbedBuilder()
        .setTitle("Rate Limited")
        .setDescription(
          `Please wait for ${cooldowns} before using this command again`
        )
        .setColor("Random");
      return interaction.reply({
        embeds: [Embed],
        ephemeral: true,
      }); //sends a message
    }
    const subCommand = interaction.options.getSubcommand(false);

    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommandFile) {
        return interaction.reply({ content: "This subcommand is outdated" });
      }
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);

    cooldown.add(interaction.user.id); //adds the cooldown to the user if they doesn't have one
    try {
      setTimeout(() => {
        cooldown.delete(interaction.user.id); //deletes the cooldown
      }, cooldowns);
    } catch {
      return;
    }
  },
};
