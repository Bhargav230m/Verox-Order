const {PermissionFlagsBits, SlashCommandBuilder} = require("discord.js");
const welcomeSchema = require("../../../Schemas/Welcome");

module.exports = {
    data: SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Enables Welcome system in your server")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel for welcome messages.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("welcome-message")
        .setDescription("Enter your welcome message.")
        .setRequired(true)
    ),
    
    async execute(interaction) {
        const {options} = interaction;

        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("welcome-message");
   

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: "I don't have permissions for this.", ephemeral: true});
        }

        welcomeSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(data) {
                return interaction.reply({content: "Looks like welcome is already enabled", ephemeral: true})
            }
            if(!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
             
                });
            }
            interaction.reply({content: 'Succesfully created a welcome message', ephemeral: true});
        })
    }
}