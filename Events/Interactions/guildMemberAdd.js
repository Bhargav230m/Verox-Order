const { EmbedBuilder } = require("discord.js");
const Schema = require("../../Schemas/Welcome");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    //welcome add
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (!data) return;

      const { user, guild } = member;
      const welcomeChannel = member.guild.channels.cache.get(data.Channel);

      const welcomeEmbed = new EmbedBuilder()
        .setTitle("**New member!**")
        .setDescription(data.Msg)
        .setColor(0x037821)
        .addFields({ name: "Total members", value: `${guild.memberCount}` })
        .addFields({ name: `Member Name`, value: `<@${member.id}>` })
        .setThumbnail(member.guild.iconURL({ size: 512 }))
        .setImage(member.user.displayAvatarURL({ size: 1024 }))
        .setTimestamp();

      welcomeChannel.send({ embeds: [welcomeEmbed] });
    });
  },
};
