const { client, config } = require("../bi");
const { MessageEmbed, MessageActionRow, MessageButton, TextInputComponent, MessageSelectMenu, Modal } = require('discord.js');
const {createTranscript} = require('discord-html-transcripts')
client.on('interactionCreate', async (interaction) => {

    //! ———————————————[Button Schema]———————————————
    var button = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('close')
            .setStyle('DANGER')
            .setLabel('Close Ticket')
            .setEmoji('🗑')
    )
    //! ———————————————[Select Menu Schema]———————————————
    const buttons = (status) => [
        new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('form')
        .setEmoji('📃')
        .setLabel('Đăng Ký')
        .setDisabled(status)
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('some')
        .setEmoji('👑')
        .setLabel('Cấp Cao')
        .setDisabled(status)
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('transcripts')
        .setEmoji('🖨')
        .setLabel('Transcripts Ticket')
        .setStyle('SUCCESS')
    )
    ]
    if (interaction.isButton()) {
        var idbtn = interaction.customId
        if (idbtn === 'btnCreate') {
            var checkTicket = interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)
            if (checkTicket !== undefined) return interaction.reply({ content: `Hey ${interaction.user.username}, bạn đã có một ticket, Đây là Ticket > <#${checkTicket.id}> !`, ephemeral: true })
            var cTicket = await interaction.guild.channels.create(`ticket ${interaction.user.username}`, {
                type: 'text',
                parent: '989115650918219826', // category
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ['VIEW_CHANNEL']
                    }, {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL']
                    },
                ]
            })
            interaction.reply({ content: `Hey ${interaction.user.username}, Ticket của bạn <#${cTicket.id}>`, ephemeral: true })
            var emb = new MessageEmbed()
                .setAuthor({ name: `Ticket Support - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setColor('LIGHT_GREY')
                .setDescription(
                    'Cảm ơn bạn đã liên hệ với chung tôi !\n\n'+
                    'Chọn **Đăng Ký** để nhận Mẫu Đơn Đăng Ký Thành Viên\n'+
                    'Chọn **Cấp Cao** để liên lạc với cấp cao\n'+
                    'Chọn **Transcripts Ticket** để lưu lại Ticket.'
                )
                .setFooter({ text: `Create By ${interaction.client.user.username}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setImage(interaction.guild.bannerURL({ size: 512 }))
            cTicket.send({ embeds: [emb], components: buttons(false) })
        }
        if (idbtn === 'close') {
            if (!interaction.memberPermissions.has('MANAGE_CHANNELS')) return interaction.reply({ content: `Hey ${interaction.user.username}, bạn không có quyền xóa ticket chỉ có Admins xóa.`, ephemeral: true })
            const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);
            const attachmemt = await createTranscript(chan, {
                limit:-1,
                returnBuffer: false,
                fileName: `${chan.name}.html`
            })
            var embed = new MessageEmbed()
            .setAuthor({name: `${interaction.guild.name} • Ticket Logs`, iconURL: interaction.guild.iconURL({dynamic: true})})
            .setColor('GREEN')
            .setDescription(
                `📰 Logs for ticket \`${chan.id}\` created by <@${chan.topic}> and deleted by <@${interaction.user.id}>`
            )
            .setTimestamp()
            .setFooter({text: `Create By ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
            guild.channels.cache.get(config.logsTicket).send({embeds: [embed], files: [attachmemt]})
            interaction.channel.send({ content: `Ticket này sẽ xóa trong 5 giây, 🎊 cảm ơn bạn đã tạo Ticket !, **<@!${chan.topic}>**` })
            setTimeout(() => chan.delete(), 1e3 * 10);
        } 
        if(idbtn === 'transcripts'){
            var embed = new MessageEmbed()
            .setAuthor({name: `${interaction.guild.name} - Transcripts Ticket`, iconURL: interaction.guild.iconURL({dynamic: true})})
            .setColor('GREEN')
            .setDescription('Bạn có muốn lưu lại lịch sử Ticket Không ?\n\n Nếu bạn muốn lưu lại lịch sử Ticket vui lòng bấm vào **Close Ticket**.\nXin cảm ơn !')
            .setFooter({text: `Create by ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
            interaction.channel.send({embeds: [embed], components: [button]})
        }
        if (idbtn === 'form') {
            var modal = new Modal()
                .setCustomId('Form')
                .setTitle('Mẫu Đơn Đăng Ký')
            const mot = new MessageActionRow()
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('mot')
                        .setLabel("Bạn chơi sever ACE được bao lâu rồi ?")
                        .setPlaceholder('Ghi rõ thông tin của bạn')
                        .setStyle('SHORT')
                        .setRequired(true)
                )
            const hai = new MessageActionRow()
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('hai')
                        .setLabel("Bạn đã đọc tất cả luật server chưa ?")
                        .setPlaceholder('Ghi rõ thông tin của bạn')
                        .setStyle('SHORT')
                        .setRequired(true)
                )
            const ba = new MessageActionRow()
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('ba')
                        .setLabel("Bạn từng ở GANG hay NHÓM nào ? Đã out chưa ?")
                        .setPlaceholder('Ghi rõ thông tin của bạn')
                        .setStyle('SHORT')
                        .setRequired(true)
                )
            const bon = new MessageActionRow()
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('bon')
                        .setLabel("Bạn đã có súng hay xe chưa ?")
                        .setPlaceholder('Ghi rõ thông tin của bạn')
                        .setStyle('SHORT')
                        .setRequired(true)
                )
            const nam = new MessageActionRow()
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('nam')
                        .setLabel("Link Steam của bạn là gì ?")
                        .setPlaceholder('Ghi rõ thông tin của bạn')
                        .setStyle('SHORT')
                        .setRequired(true)
                )
            modal.addComponents(mot, hai, ba, bon, nam);
            await interaction.showModal(modal);
        }
        if (idbtn === 'some') {
            await interaction.reply({ content: `Bạn vui lòng đặt câu hỏi hoặc nói những gì bạn muốn ở đây, <@&971217338466713612> sẽ trả lời bạn sớm nhất.`, components: [button] })
            var firstmessage = await interaction.channel.messages.fetch({ after: 1, limit: 1 })
            var msg = firstmessage.first()
            await msg.edit({ components: buttons(true) })
        }
    }
    if (interaction.isModalSubmit()) {
        var mot = interaction.fields.getTextInputValue('mot')
        var hai = interaction.fields.getTextInputValue('hai')
        var ba = interaction.fields.getTextInputValue('ba')
        var bon = interaction.fields.getTextInputValue('bon')
        var nam = interaction.fields.getTextInputValue('nam')
        var menbers = interaction.guild.members.cache.get(interaction.channel.topic)
        var embed = new MessageEmbed()
        .setAuthor({name: `${interaction.guild.name} • Ticket Info ${menbers.user.user}`, iconURL: interaction.guild.iconURL({dynamic: true})})
        .setColor('GREEN')
        .setDescription(
            `Cảm ơn <@${interaction.user.id}> đã điền đơn đăng ký thành viên, xin vui lòng đợi QL kiểm tra và trả lời đơn của bạn sớm nhất.\n` +
            '\n**Đơn Đăng Ký**\n' +
            `Bạn chơi sever ACE được bao lâu rồi ?\n> ${mot}\n` +
            `Bạn đã đọc tất cả luật server chưa ?\n> ${hai}\n` +
            `Bạn từng ở GANG hay NHÓM nào ? Đã out chưa ?\n> ${ba}\n` +
            `Bạn đã có súng hay xe chưa ?\n> ${bon}\n` +
            `Link Steam của bạn là gì ?\n> ${nam}`
        )
        .setFooter({text: `Create by ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
        await interaction.channel.send({
            embeds: [embed]
        })
        var firstmessage = await interaction.channel.messages.fetch({ after: 1, limit: 1 })
        var msg = firstmessage.first()
        await msg.edit({ components: buttons(true) })
    }
})