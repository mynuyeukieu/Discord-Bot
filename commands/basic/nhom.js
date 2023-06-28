const { MessageEmbed } = require("discord.js");
const { db, config, httpsAgent } = require("../../bi");
const fetch = require("node-fetch").default;
const UserAgent = require('user-agents');
const useragent = new UserAgent();
var mapName = new Map();
module.exports = {
  name: "nhom",
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

    const url = "https://" + config.SERVER_URL + "/players.json";
    const response = await fetch(url, { agent: httpsAgent });
    const nhoms = await fetch(
      `http://185.193.66.112:3001/nhom/${message.guildId}`,
    );
    const infos = await fetch("https://" + config.SERVER_URL + "/info.json", {
      agent: httpsAgent,
    });
    const body = await response.json();
    const nhom = await nhoms.json();
    const info = await infos.json();
    // Server Off
    if (body === undefined)
      return message.reply(`Server Offline or Server Request Error !`);

    if (nhom.length < 1)
      return message
        .reply(
          "Không có dữ liệu nào về Nhóm trong hệ thống vui lòng Update Nhóm vào hệ thống. CMD: /addnhom",
        )
        .then((m) => setTimeout(() => m.delete(), 1e3 * 30));
    var gang = "";
    for (let i = 0; i < nhom.length; i++) {
      var nametag = nhom[i].nhom_name;
      var namehc = nhom[i].HC;
      if (nhom[i].HC == "khong") {
        var sltag = 0;
        for (let j = 0; j < body.length; j++) {
          var namesv = body[j]["name"];
          if (namesv.substring(0, nametag.length) === nametag) {
            sltag = sltag + 1;
          }
        }
        gang = gang + `Nhóm ${nametag}: ${sltag}\n`;
      } else {
        var sltag = 0;
        for (let j = 0; j < body.length; j++) {
          var namesv = body[j]["name"];
          if (
            namesv.substring(0, nametag.length) === nametag ||
            namesv.substring(0, namehc.length) === namehc
          ) {
            sltag = sltag + 1;
          }
        }
        gang = gang + `Nhóm ${nametag}: ${sltag}\n`;
      }
    }
    var checkName = 0;
    for (let j = 0; j < body.length; j++) {
      var namesv = body[j]["name"];
      var idsv = body[j]["id"];
      var pingsv = body[j]["ping"];
      if (
        namesv.substring(0, nhom[0].nhom_name.length) === nhom[0].nhom_name ||
        namesv.substring(0, nhom[0].HC.length) === nhom[0].HC
      ) {
        mapName.set(`Name_${checkName++}`, {
          name: namesv,
          id: idsv,
          ping: pingsv,
        });
      }
    }
    var job = info.vars["Công việc"];
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
    var embedtl = new MessageEmbed()
      .setAuthor({
        name: `${message.guild.name} - Online`,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setColor("DARK_GREEN")
      .setDescription(`Danh sách thành viên của ${message.guild.name}: `)
      .setFooter({
        text: `Create by ® ${client.user.username}`,
        iconURL: client.user.avatarURL({ dynamic: true }),
      })
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTimestamp();
    if (pgName1.length > 1) {
      embedtl.addFields(
        { name: "ID", value: `${pgId1}`, inline: true },
        { name: "Tên", value: `${pgName1}`, inline: true },
        { name: "Ping", value: `${pgPing1}`, inline: true },
      );
    }
    if (pgName2.length > 1) {
      embedtl.addFields(
        { name: "ID", value: `${pgId2}`, inline: true },
        { name: "Tên", value: `${pgName2}`, inline: true },
        { name: "Ping", value: `${pgPing2}`, inline: true },
      );
    }
    if (pgName3.length > 1) {
      embedtl.addFields(
        { name: "ID", value: `${pgId3}`, inline: true },
        { name: "Tên", value: `${pgName3}`, inline: true },
        { name: "Ping", value: `${pgPing3}`, inline: true },
      );
    }

    var embedgang = new MessageEmbed()
      .setAuthor({
        name: `${message.guild.name} - Nhóm Online`,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setColor("DARK_GREEN")
      .setDescription(
        "```css\n●▬▬▬▬▬▬▬▬▬๑۩ Danh sách Nhóm ๑۩▬▬▬▬▬▬▬▬●\n" +
          `${gang}` +
          "●▬▬▬▬๑۩ Người Trong Ngành ๑۩▬▬▬▬●\n" +
          `${job}\n` +
          "●▬▬▬▬▬▬▬▬▬▬๑۩ END ๑۩▬▬▬▬▬▬▬▬▬▬●```",
      )
      .setFooter({
        text: `Create by ® ${client.user.username}`,
        iconURL: client.user.avatarURL({ dynamic: true }),
      })
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTimestamp();
    message.reply({ embeds: [embedtl, embedgang] });
    mapName.clear();
  },
};
