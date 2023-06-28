// const { client, config } = require('../kingmansv1')
// const { MessageEmbed } = require('discord.js')
// const jointocreatemap = new Map();
// let log = console.log

// client.on("voiceStateUpdate", (oldState, newState) => {
//     if (newState.guild.id !== '922754118202818560') return;
//     var channel = client.channels.cache.get('1026171887346262138')
//     // SET CHANNEL NAME STRING
//     //IGNORE BUT DONT DELETE!
//     let oldparentname = "unknown"
//     let oldchannelname = "unknown"
//     let oldchanelid = "unknown"
//     if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
//     if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
//     if (oldState && oldState.channelId) oldchanelid = oldState.channelId
//     let newparentname = "unknown"
//     let newchannelname = "unknown"
//     let newchanelid = "unknown"
//     if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
//     if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
//     if (newState && newState.channelId) newchanelid = newState.channelId
//     if (oldState.channelId) {
//         if (typeof oldState.channel.parent !== "undefined") oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
//         else oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
//     }
//     if (newState.channelId) {
//         if (typeof newState.channel.parent !== "undefined") newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
//         else newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
//     }
//     // JOINED V12
//     if (!oldState.channelId && newState.channelId) {
//         var embed = new MessageEmbed()
//             .setAuthor({ name: `${newState.guild.name} Notify - Join Voice Channel`, iconURL: newState.guild.iconURL({ dynamic: true }) })
//             .setColor('GREEN')
//             .setDescription(`<@${newState.member.id}> joined voice channel <#${newState.channelId}>`)
//             .setFooter({ text: `Create by ® ${client.user.username}`, iconURL: client.user.avatarURL({ dynamic: true }) })
//             .setThumbnail(newState.guild.iconURL({ dynamic: true }))
//             .setTimestamp()
//         channel.send({ embeds: [embed] })
//         if (newState.channelId === '1026197889506103477') {
//             jointocreatechannel2(newState)
//         } if (newState.channelId === '1026197799198535790') {
//             jointocreatechannel(newState);   //load the function
//         } return;
//     }
//     // LEFT V12
//     if (oldState.channelId && !newState.channelId) {
//         var embed = new MessageEmbed()
//             .setAuthor({ name: `${oldState.guild.name} Notify - Left Voice Channel`, iconURL: oldState.guild.iconURL({ dynamic: true }) })
//             .setColor('RED')
//             .setDescription(`<@${oldState.member.id}> left voice channel <#${oldState.channelId}>`)
//             .setFooter({ text: `Create by ® ${client.user.username}`, iconURL: client.user.avatarURL({ dynamic: true }) })
//             .setThumbnail(oldState.guild.iconURL({ dynamic: true }))
//             .setTimestamp()
//         channel.send({ embeds: [embed] })
//         //get the jointocreatechannel id from the map
//         if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {
//             //fetch it from the guild
//             var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));
//             //if the channel size is below one
//             if (vc.members.size < 1) {
//                 //delete it from the map
//                 jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`);
//                 //log that it is deleted
//                 //delete the voice channel
//                 return vc.delete();
//             }
//             else {
//             }
//         }
//     }
//     // Switch v12
//     if (oldState.channelId && newState.channelId) {
//         if (oldState.channelId !== newState.channelId) {
//             var embed = new MessageEmbed()
//                 .setAuthor({ name: `${newState.guild.name} Notify - Switch Voice Channel`, iconURL: newState.guild.iconURL({ dynamic: true }) })
//                 .setColor('DARK_GOLD')
//                 .setDescription(`<@${newState.member.id}>  switched voice channel <#${oldState.channelId}> to <#${newState.channelId}>`)
//                 .setFooter({ text: `Create by ® ${client.user.username}`, iconURL: client.user.avatarURL({ dynamic: true }) })
//                 .setThumbnail(newState.guild.iconURL({ dynamic: true }))
//                 .setTimestamp()
//             channel.send({ embeds: [embed] })
//             //if its the join to create channel
//             if (newState.channelId === '1026197889506103477') {
//                 //make a new channel
//                 jointocreatechannel(oldState);
//             } if (newState.channelId === '1026197799198535790') {
//                 jointocreatechannel2(oldState)
//             }
//             //BUT if its also a channel ín the map (temp voice channel)
//             if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {
//                 //fetch the channel
//                 var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));
//                 //if the size is under 1
//                 if (vc.members.size < 1) {
//                     //delete it from the map
//                     jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`);
//                     //log it 
//                     //delete the room
//                     return vc.delete();
//                 }
//                 else {
//                 }
//             }
//         }
//     }
// })

// async function jointocreatechannel(user) {
//     //user.member.user.send("This can be used to message the member that a new room was created")
//     var vc = await user.guild.channels.create(`${user.member.user.username}'s Room`, {
//         type: 'GUILD_VOICE',
//         parent: '984504171615105036', //or set it as a category id
//         userLimit: '99',
//         bitrate: '384000',
//         permissionOverwrites: [
//             {
//                 id: user.id,
//                 allow: ['MANAGE_CHANNELS'],
//             },
//             {
//                 id: user.guild.id,
//                 allow: ['VIEW_CHANNEL'],
//             },
//         ]

//     }).then(async vc => {
//         jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
//         user.setChannel(vc.id)
//     })
// }

// async function jointocreatechannel2(user) {
//     //user.member.user.send("This can be used to message the member that a new room was created")
//     var role = user.guild.roles.cache.get('971113672468488283') // Thành Viên
//     // var roles = user.guild.roles.cache.get('1019139776584097836') // Cựu Chiến Binh
//     var vc = await user.guild.channels.create(`${user.member.user.username}'s Room G `, {
//         type: 'GUILD_VOICE',
//         parent: '984504171615105036', //or set it as a category id
//         userLimit: '99',
//         bitrate: '384000',
//         permissionOverwrites: [
//             {
//                 id: user.id,
//                 allow: ['MANAGE_CHANNELS'],
//             },
//             {
//                 id: user.guild.id,
//                 deny: ['VIEW_CHANNEL'],
//             },
//             {
//                 id: role.id,
//                 allow: ['VIEW_CHANNEL'],
//             },
//             // {
//             //     id: roles.id,
//             //     allow: ['VIEW_CHANNEL'],
//             // }
//         ]

//     }).then(async vc => {
//         jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
//         user.setChannel(vc.id)
//     })
// }

