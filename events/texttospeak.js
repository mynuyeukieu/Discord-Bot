// const { client, config } = require('../kingmansv1');
// const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
// const { joinVoiceChannel, createAudioResource, createAudioPlayer, StreamType, getVoiceConnection } = require('@discordjs/voice');
// const discordTTS = require('discord-tts');
// var maptts = new Map();
// var audioPlayer = createAudioPlayer();
// var log = console.log;
// client.on('interactionCreate', async (interaction) => {
//     //! ———————————————[Button Schema]———————————————
//     if (interaction.isButton()) {
//         var idtts = interaction.customId
//         var voices = interaction.member.voice.channelId
//         if (idtts === 'ttscreate') {
//             if (voices === null) return interaction.reply({ content: 'Ey, bạn phải ở trong một Room voice để tạo Bot TTS !', ephemeral: true })
//             var checktts = interaction.guild.channels.cache.find(c => c.name === '│😶│câm-điếc')
//             if (checktts !== undefined) return interaction.reply({ content: `Hey ${interaction.user.username}, Hình như đã có một room Bot TTS đã được tạo > <#${checktts.id}> !`, ephemeral: true })
//             var ctts = await interaction.guild.channels.create(`│😶│câm-điếc`, {
//                 type: 'text',
//                 parent: interaction.channel.parentId, // category
//                 permissionOverwrites: [
//                     {
//                         id: interaction.guild.id,
//                         allow: ['VIEW_CHANNEL']
//                     }
//                 ]
//             })
//             maptts.set(`bot-tts-channel`, ctts.id)
//             maptts.set(`bot-tts-voice`, voices)
//             var embed = new MessageEmbed()
//                 .setAuthor({ name: `Bot TTS - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
//                 .setColor('LIGHT_GREY')
//                 .setDescription('> Hello, có vẻ như bạn đã không sử dụng được mic. Bạn có thể Close TTS sau khi đã dùng xong, vui lòng ý thức để người khác có thể sử dụng !')
//                 .setFooter({ text: `Create By ${interaction.client.user.username}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
//                 .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
//                 .setImage(interaction.guild.bannerURL({ size: 512 }))
//             var button = new MessageActionRow().addComponents(
//                 new MessageButton()
//                     .setCustomId('ttsclose')
//                     .setLabel('Close TTS')
//                     .setStyle('DANGER')
//                     .setEmoji('🗑')
//             )
//             ctts.send({ embeds: [embed], components: [button] })
//             interaction.reply({ content: `Hey ${interaction.user.username}, bạn đã tạo thành công Room TTS > <#${ctts.id}>`, ephemeral: true })
//             let voice = joinVoiceChannel({
//                 channelId: voices,
//                 guildId: interaction.guild.id,
//                 adapterCreator: interaction.guild.voiceAdapterCreator
//             })
//             voice.subscribe(audioPlayer)
//             //log(maptts)
//         }
//         if (idtts === 'ttsclose') {
//             var ctts = interaction.guild.channels.cache.get(interaction.channel.id)
//             await interaction.reply({ content: `Room TTS sẽ được xóa trong 10s, mọi tin nhắn mà bạn nhắn trong đây sẽ không được lưu lại !` })
//             setTimeout(() => ctts.delete(), 1e3 * 10)
//             maptts.clear()
//             var voice = getVoiceConnection(interaction.guildId);
//             if (!voice) return;
//             voice.disconnect();
//         }
//     }
// })

// client.on('messageCreate', async (msg) => {
//     if (msg.member.user.bot === true) return;
//     var ctts = msg.guild.channels.cache.get(maptts.get('bot-tts-channel'))
//     var checkvoice = msg.guild.channels.cache.get(maptts.get('bot-tts-voice'))
//     if (!ctts) return;
//     if (msg.channel.id === ctts.id) {
//         if (!checkvoice) {
//             maptts.set('bot-tts-voice', msg.member.voice.channelId)
//             msg.reply('Bạn vừa được set lại Room Voice TTS, bạn vui lòng nhập lại lời cần nói !')
//         } else {
//             var checkuser = msg.member.voice.channelId
//             if (checkuser !== checkvoice.id) return msg.reply('Có vẻ nhưng bạn ngồi sai Room voice để sài Bot !');
//             var mess = msg.content.split(' ')
//             if (mess.length > 200) return msg.reply('Bạn không thể nhập quá 200 từ !')
//             var voice = joinVoiceChannel({
//                 channelId: checkvoice.id,
//                 guildId: msg.guild.id,
//                 adapterCreator: msg.guild.voiceAdapterCreator
//             })
//             voice.subscribe(audioPlayer)
//             var stream = discordTTS.getVoiceStream(msg.content);
//             var tts = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
//             audioPlayer.play(tts)
//         } if (msg.content.startsWith('botclose')) {
//             const voice = getVoiceConnection(msg.guildId);
//             if (!voice) return msg.reply('Bot không có kết nối với bất kỳ Room Voice nào, xin vui lòng nhập ký tự để tiếp tục sử dụng.');
//             maptts.set('bot-tts-voice', 0);
//             voice.disconnect();
//         }
//     } return;
// })