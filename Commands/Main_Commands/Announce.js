const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Create a announcemen")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("announcement")
        .setDescription("whats the announcement?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const application = new ModalBuilder()
    .setCustomId("developerModal")
    .setTitle("Make an Announcement");

  const username = new TextInputBuilder()
    .setCustomId("a")
    .setLabel("Announcer's Tag")
    .setPlaceholder("The user that is announcing tag(ex: Technologypower#3174)")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const wwyd = new TextInputBuilder()
    .setCustomId("b")
    .setLabel("Announcement")
    .setPlaceholder("Explain briefly")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

  const about = new TextInputBuilder()
    .setCustomId("c")
    .setLabel("Anything Else")
    .setPlaceholder("You want to add anything else?")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(false);

  const firstActionRow = new ActionRowBuilder().setComponents(username);
  const secondActionRow = new ActionRowBuilder().setComponents(wwyd);
  const fourthActionRow = new ActionRowBuilder().setComponents(about);

  application.setComponents(
    firstActionRow,
    fourthActionRow,
    secondActionRow,
  );

  try {
    await interaction.showModal(application);
  } catch (e) {
    interaction.reply({ content: `${e}`, ephemeral: true });
    console.log(e);
  }

  },
};
