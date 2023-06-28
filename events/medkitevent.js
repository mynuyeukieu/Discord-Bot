// const { client } = require('../kingmansv1')
// const { MessageEmbed } = require('discord.js')
// const medkitG = require("../schema/medkit");

// client.on('messageCreate', async (message) => {
//     var logMed = message.guild.channels.cache.get('1026171923316625498'); //* Log Med
//     var logerror = message.guild.channels.cache.get('1026174598716330097'); //* Log Error
//     //* Lay Med
//     if (message.content.startsWith("laymed") || message.content.startsWith("Laymed")) {
//         if (message.guildId !== '922754118202818560') return;
//         var arr = message.content.split(" ");
//         var med = Number(arr[1]);
//         if (!med) return;
//         if (med < 1) return message.reply('Không thể lấy số lượng Medkit dưới 1 !').then(msg => setTimeout((msg.delete(), 1e3 * 15)));
//         try {
//             var guildId = message.guildId
//             const res = await medkitG.findOneAndUpdate(
//                 {
//                     userId: '355632903344095233',
//                     guildId
//                 }, {
//                 userId: '355632903344095233',
//                 guildId,
//                 name: 'Medkit',
//                 $inc: {
//                     medkit: -med
//                 }
//             }, {
//                 new: true,
//                 upsert: true
//             }
//             )
//             const slmed = res.medkit
//             var embed = new MessageEmbed()
//                 .setAuthor({ name: `${message.guild.name} - Thông Báo`, iconURL: message.guild.iconURL({ dynamic: true }) })
//                 .setColor('RED')
//                 .setDescription(
//                     `Thành Viên: <@${message.author.id}>\n` +
//                     `Đã lấy : **${med}** Medkit\n` +
//                     `kênh Chat: <#${message.channel.id}>\n` +
//                     `Time: <t:${Math.floor(new Date().getTime() / 1000.0)}:F> - <t:${Math.floor(new Date().getTime() / 1000.0)}:R>\n` +
//                     `Tổng Medkit: **${slmed}**`
//                 )
//                 .setThumbnail(message.guild.iconURL({ dynamic: true }))
//                 .setFooter({ text: `Create By ${client.user.username}`, iconURL: client.user.avatarURL({ dynamic: true }) })
//             logMed.send({ embeds: [embed] });
//         } catch (e) {
//             message.reply("Đã sảy ra lỗi ở đâu đó");
//             logerror.send(` Lỗi Laymed: \n ${e}`);

//         }
//     }
//     //* Cat Med
//     if (message.content.startsWith("catmed")) {
//         if (message.guildId !== '922754118202818560') return;
//         var arr = message.content.split(" ");
//         var med = Number(arr[1]);
//         if (!med) return;
//         if (med < 1) return message.reply('Không thể cất số lượng Medkit dưới 1 !').then(msg => setTimeout((msg.delete(), 1e3 * 15)));
//         try {
//             var guildId = message.guildId
//             const res = await medkitG.findOneAndUpdate(
//                 {
//                     userId: '355632903344095233',
//                     guildId
//                 }, {
//                 userId: '355632903344095233',
//                 guildId,
//                 name: 'Medkit',
//                 $inc: {
//                     medkit: +med
//                 }
//             }, {
//                 new: true,
//                 upsert: true
//             }
//             )
//             const slmed = res.medkit
//             var embed = new MessageEmbed()
//                 .setAuthor({ name: `${message.guild.name} - Thông Báo`, iconURL: message.guild.iconURL({ dynamic: true }) })
//                 .setColor('GREEN')
//                 .setDescription(
//                     `Thành Viên: <@${message.author.id}>\n` +
//                     `Đã cất : **${med}** Medkit\n` +
//                     `kênh Chat: <#${message.channel.id}>\n` +
//                     `Time: <t:${Math.floor(new Date().getTime() / 1000.0)}:F> - <t:${Math.floor(new Date().getTime() / 1000.0)}:R>\n` +
//                     `Tổng Medkit: **${slmed}**`
//                 )
//                 .setThumbnail(message.guild.iconURL({ dynamic: true }))
//                 .setFooter({ text: `Create By ${client.user.username}`, iconURL: client.user.avatarURL({ dynamic: true }) })
//             logMed.send({ embeds: [embed] });
//         } catch (e) {
//             message.reply("Đã sảy ra lỗi ở đâu đó");
//             logerror.send(` Lỗi catmed: \n ${e}`);

//         }
//     }
//     //* Kiem tra Med
//     if (message.content.startsWith("ktmed")) {
//         if (message.guildId !== '922754118202818560') return;
//         // var arr = message.content.split(" ");
//         // var med = Number(arr[1]);
//         // if (!med) return;
//         // if (med < 1) return message.reply('Không thể cất số lượng Medkit dưới 1 !').then(msg => setTimeout((msg.delete(), 1e3 * 15)));
//         try {
//             var guildId = message.guildId
//             const res = await medkitG.findOne(
//                 {
//                     userId: '355632903344095233',
//                     guildId
//                 }
//             )
//             const slmed = res.medkit
//             var embed = new MessageEmbed()
//                 .setAuthor({ name: `${message.guild.name} - Thông Báo`, iconURL: message.guild.iconURL({ dynamic: true }) })
//                 .setColor('GOLD')
//                 .setDescription(
//                     `Time: ${new Date()}\n` +
//                     `Tổng Medkit: **${slmed}**`
//                 )
//                 .setThumbnail(message.guild.iconURL({ dynamic: true }))
//                 .setFooter({ text: `Create By ${client.user.username}`, iconURL: client.user.avatarURL({ dynamic: true }) })
//             logMed.send({ embeds: [embed] });
//         } catch (e) {
//             message.reply("Đã sảy ra lỗi ở đâu đó");
//             logerror.send(` Lỗi ktmed: \n ${e}`);

//         }
//     }
// })