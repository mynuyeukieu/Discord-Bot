const { client } = require("../bi");
const { Collection, MessageEmbed, MessageButton } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path');
var log = console.log
const timework = require('../schema/timework');
const paginationEmbed = require('discordjs-button-pagination');
//! ———————————————[Loading SlashCommands]———————————————
client.cmd = new Collection();
const commandsPath = path.join(__dirname, '../slashcommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.cmd.set(command.data.name, command);
}

//! ———————————————[Convert Time]———————————————
function getTime(dif) {
    var hours = dif / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
    var output = h + ':' + m + ':' + s
    return output;
}

//!——————————————————————————————————————————

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const commands = client.cmd.get(interaction.commandName);

        if (!commands) return;

        try {
            await commands.run(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    //! ———————————————[Context Menu]———————————————
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: true });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
    //! ———————————————[Button Event]———————————————
    if (interaction.isButton()) {
        var btnID = interaction.customId;
        if (btnID === 'checkin') {
            var checkin = interaction.guild.channels.cache.find((c) => c.name === 'checkin');
            if (checkin === undefined) {
                interaction.reply({ content: 'Xin vui lòng bấm khởi tạo để tạo Room CheckIn & CheckOut' })
                return setTimeout(() => {
                    interaction.deleteReply()
                }, 1e3 * 5)
            }
            await timework.findOneAndUpdate({
                userId: `${interaction.user.id}`,
                guildId: `${interaction.guildId}`
            }, {
                $set: {
                    timein: new Date(),
                    timeout: 0
                }
            }, {
                new: true,
                upsert: true
            })
            interaction.reply({ content: 'Bạn đã Check In thành công.', ephemeral: true });
            checkin.send(`Hey <@${interaction.user.id}>, Bạn đã bấm check In vào lúc <t:${Math.floor(new Date().getTime() / 1000.0)}:F> • <t:${Math.floor(new Date().getTime() / 1000.0)}:T>.\n> Xin vui lòng Reply tin nhắn này và gửi hình ảnh.\n Xin cảm ơn !`);
        } else if (btnID === 'checkout') {
            var checkout = interaction.guild.channels.cache.find((c) => c.name === 'checkout');
            if (checkout === undefined) {
                interaction.reply({ content: 'Xin vui lòng bấm khởi tạo để tạo Room CheckIn & CheckOut' })
                return setTimeout(() => {
                    interaction.deleteReply()
                }, 1e3 * 5)
            }
            var timeold = await timework.findOne({ userId: `${interaction.user.id}`, guildId: `${interaction.guildId}` });
            if (timeold.timein === 0) return interaction.reply({ content: 'Bạn chưa CheckIn, Xin vui lòng CheckIn trước khi CheckOut.', ephemeral: true });
            await timework.findOneAndUpdate({
                userId: `${interaction.user.id}`,
                guildId: `${interaction.guildId}`
            }, {
                $set: {
                    timein: 0,
                    timeout: new Date(),
                },
                $inc: {
                    time: new Date() - new Date(timeold.timein)
                }
            }, {
                new: true,
                upsert: true
            })
            interaction.reply({ content: 'Bạn đã Check Out thành công.', ephemeral: true })
            checkout.send(`Hey <@${interaction.user.id}>, bạn đã Check Out vào lúc <t:${Math.floor(new Date().getTime() / 1000.0)}:F> • <t:${Math.floor(new Date().getTime() / 1000.0)}:T>\n> Xin vui lòng Reply Tin nhắn này vào gửi hình ảnh vào.\nXin cảm ơn !`)
        } else if (btnID === 'check') {
            var user = await timework.find({ guildId: `${interaction.guildId}` })
            var listpage = [];
            var count = 0;
            var page = 0;
            var list = [];
            for (let i = 0; i < user.length; i++) {
                list.push({ userId: user[i].userId, time: user[i].time })
                count += 1
                if (count > 1) {
                    listpage[page++] = list;
                    list = [];
                    count = 0;
                }
            }
            if (list.length > 0) {
                listpage[page++] = list;
            }
            var embeds = [];
            var buttons = [];
            var userid = '';
            var time = '';
            for (let i = 0; i < page; i++) {
                listpage[i].map((v) => {
                    userid += `${interaction.guild.members.cache.get(`${v.userId}`).user.tag}\n`
                    time += `${getTime(v.time)}\n`
                })
                embeds.push(new MessageEmbed()
                    .setAuthor({ name: `${interaction.guild.name} • Time Table`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setColor('#1877F2')
                    .addFields(
                        { name: 'Thành Viên', value: userid, inline: true },
                        { name: 'Online', value: time, inline: true }
                    )
                )
                userid = '';
                time = '';
            }
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Previous')
                .setEmoji('👈')
                .setStyle('PRIMARY');

            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Next')
                .setEmoji('👉')
                .setStyle('SUCCESS');

            const button3 = new MessageButton()
                .setCustomId('close')
                .setLabel('Close')
                .setEmoji('❌')
                .setStyle('DANGER')

            buttons = [button1, button2, button3]

            paginationEmbed(interaction, embeds, buttons, 120000)
        } else if (btnID === 'close') {
            await interaction.message.delete()
        } else if (btnID === 'reset') {
            var user = await timework.find({ guildId: `${interaction.guildId}` })
            for (let i = 0; i < user.length; i++) {
                await timework.findOneAndUpdate(
                    {
                        userId: `${user[i].userId}`,
                        guildId: `${user[i].guildId}`
                    }, {
                    $set: {
                        time: 0,
                        timein: 0,
                        timeout: 0
                    }
                }, {
                    new: true,
                    upsert: true
                }
                )
            }
            interaction.reply({ content: 'Bạn đã reset thành công thời gian Online của Tất cả thành viên !' })
            setTimeout(() => {
                interaction.deleteReply();
            }, 1e3 * 5)
        } else if (btnID === 'createchannel') {
            if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({ content: 'Bạn không đủ quyền hạn để thực thi hành động này!', ephemeral: true })
            var checkin = interaction.guild.channels.cache.find((c) => c.name === 'checkin');
            if (checkin === undefined) {
                await interaction.guild.channels.create('checkin', {
                    type: 'GUILD_TEXT',
                    parent: interaction.channel.parentId
                })
            }
            var checkout = interaction.guild.channels.cache.find((c) => c.name === 'checkout');
            if (checkout === undefined) {
                await interaction.guild.channels.create('checkout', {
                    type: 'GUILD_TEXT',
                    parent: interaction.channel.parentId
                })
            }
            interaction.reply({ content: 'Bạn đã khởi tạo thành công, xin vui lòng chỉnh quyền cho Channel mới khởi tạo !', ephemeral: true })
        }
    }
    //!——————————————————————————————————————————
});