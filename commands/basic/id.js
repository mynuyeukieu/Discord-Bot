const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch").default;
const UserAgent = require('user-agents');
const useragent = new UserAgent();
const { db, config, httpsAgent } = require("../../bi");
const axios = require('axios').default;
module.exports = {
  name: "id",
  aliases: ["", "", ""],
  cooldowns: 3000,
  description: "",
  usage: "",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    var taget = args[0];
    if (message.channel.id !== config.gang)
      return message
        .reply(
          `Bạn không thể sử lệnh ở Channel này, bạn có thể sử dụng lệnh ở đây <#${config.gang}>`,
        )
        .then((m) => setTimeout(() => m.delete(), 1e3 * 5));
    const url = "https://" + config.SERVER_URL + "/players.json";
    // const bodys = await fetch(url, { agent: httpsAgent,headers: {'User-Agent': useragent.toString()} })
    // const body = await bodys.json();
    var green = "#5efd8a";
    try {
      const {status, data} = await axios.get(url, {httpsAgent: httpsAgent, headers: {'User-Agent': useragent.toString()}});
      if (status !== 200)
        return message.channel
          .send("Server Dang Reset, xin vui lòng thử lại sau !")
          .then((msg) => msg.delete({ timeout: 5000 }));
      var hexToDec = require("number-convert");
      if (!taget) {
        return message.channel.send(
          "Bạn đã nhập sai lệnh VD: **" + config.prefix + "search __id__**",
        );
      }
      
      var result = data.find(v => v.id.toString() == taget.toString())
      // var result = start[0];
      var hexString = result.identifiers[0].substr(6, 15);
      var steamid = hexToDec(hexString, 16, 10);
      const token = config.TOKEN_STEAM;
      const summaries = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${token}&steamids=${steamid}`;
      fetch(summaries)
        .then((res) => res.json())
        .then((body) => {
          if (!body.response)
            return message.channel.send("Không tìm thấy steam profile...");
          const { profileurl, avatarfull, personaname } =
            body.response.players[0];
          const embed = new MessageEmbed()
            .setColor(green)
            .setAuthor({
              name: `Thông Tin Steam ${personaname}`,
              iconURL: avatarfull,
            })
            .setThumbnail(avatarfull)
            .addFields(
              { name: "Tên", value: `${result.name}`, inline: true },
              { name: "ID", value: `${result.id}`, inline: true },
              { name: "Ping", value: `${result.ping}`, inline: true },
              {
                name: "Link Steam",
                value: `[Link to profile](${profileurl})`,
                inline: true,
              },
            )
            .setTimestamp()
            .setFooter({
              text: `Được yêu cầu bởi ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            });
          var sDiscord = result.identifiers.find((n) =>
            n.startsWith("discord"),
          );
          if (sDiscord !== undefined) {
            var isDiscord = sDiscord.split(/[:]/);
            embed.addFields({
              name: "Discord",
              value: `<@${isDiscord[1]}>`,
              inline: false,
            });
          }
          message.reply({ embeds: [embed] });
        });
    } catch (err) {
      message.channel.send(
        `Không tìm thấy **ID:${taget}**, bạn vui lòng thử lại sau.`,
      );
      console.log(err);
    }
  },
};
