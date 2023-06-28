const { MessageEmbed } = require("discord.js");
const { db, config, httpsAgent } = require("../../bi");
const fetch = require("node-fetch").default;
const UserAgent = require('user-agents');
const useragent = new UserAgent();
var mapName = new Map();
module.exports = {
  name: "search",
  aliases: ["", "", ""],
  cooldowns: 3000,
  description: "",
  usage: "",
  toggleOff: false,
  developersOnly: false,
  userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  botpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    if (message.channel.id !== config.gang)
      return message
        .reply(
          `Bạn không thể sử lệnh ở Channel này, bạn có thể sử dụng lệnh ở đây <#${config.gang}>`,
        )
        .then((m) => setTimeout(() => m.delete(), 1e3 * 5));

    var taget = args[0];
    const url = "https://" + config.SERVER_URL + "/players.json";
    const bodys = await fetch(url, { agent: httpsAgent,headers: {'User-Agent': useragent.toString()} });
    const body = await bodys.json();
    // Server Off
    if (body === undefined)
      return message.reply(`Server Offline or Server Request Error !`);

    try {
      if (!taget) {
        return message.channel.send(
          "Bạn đã nhập sai lệnh VD: **" + config.prefix + "search __tên__**",
        );
      }
      var count = taget.length;
      var entry = body;
      var checkName = 0;
      for (let i = 1; i < entry.length; i++) {
        var a = entry[i]["name"];
        var b = entry[i]["id"];
        var d = entry[i]["ping"];
        if (a.substring(0, count) == `${taget}`) {
          mapName.set(`Name_${checkName++}`, { name: a, id: b, ping: d });
        }
      }
      var sl = 0;
      for (let i = 1; i < entry.length; i++) {
        var a = entry[i]["name"];
        if (a.substring(0, count) == `${taget}`) {
          sl = sl + 1;
        }
      }
      var pgName1 = "";
      var pgName2 = "";
      var pgName3 = "";
      var pgId1 = "";
      var pgId2 = "";
      var pgId3 = "";
      var pgPing1 = "";
      var pgPing2 = "";
      var pgPing3 = "";
      for (let i = 0; i < mapName.size; i++) {
        if (i < 30) {
          pgName1 = pgName1 + `${mapName.get(`Name_${i}`).name}\n`;
          pgId1 = pgId1 + `${mapName.get(`Name_${i}`).id}\n`;
          pgPing1 = pgPing1 + `${mapName.get(`Name_${i}`).ping}\n`;
        } else if (i < 60) {
          pgName2 = pgName2 + `${mapName.get(`Name_${i}`).name}\n`;
          pgId2 = pgId2 + `${mapName.get(`Name_${i}`).id}\n`;
          pgPing2 = pgPing2 + `${mapName.get(`Name_${i}`).ping}\n`;
        } else {
          pgName3 = pgName3 + `${mapName.get(`Name_${i}`).name}\n`;
          pgId3 = pgId3 + `${mapName.get(`Name_${i}`).id}\n`;
          pgPing3 = pgPing3 + `${mapName.get(`Name_${i}`).ping}\n`;
        }
      }
      const embed = new MessageEmbed()
        .setDescription(` Đã tìm thấy **${sl}** người có tên **${taget}** :`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter({
          text: `Được yêu cầu bởi ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        });
      if (pgName1.length > 1) {
        embed.addFields(
          { name: "ID", value: `${pgId1}`, inline: true },
          { name: "Tên", value: `${pgName1}`, inline: true },
          { name: "Ping", value: `${pgPing1}`, inline: true },
        );
      }
      if (pgName2.length > 1) {
        embed.addFields(
          { name: "ID", value: `${pgId2}`, inline: true },
          { name: "Tên", value: `${pgName2}`, inline: true },
          { name: "Ping", value: `${pgPing2}`, inline: true },
        );
      }
      if (pgName3.length > 1) {
        embed.addFields(
          { name: "ID", value: `${pgId3}`, inline: true },
          { name: "Tên", value: `${pgName3}`, inline: true },
          { name: "Ping", value: `${pgPing3}`, inline: true },
        );
      }
      message.reply({ embeds: [embed] });
      mapName.clear();
    } catch (err) {
      message.channel.send(`Người Chơi Không Online <@${message.author.id}>`);
    }
  },
};
