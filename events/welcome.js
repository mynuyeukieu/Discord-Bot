const { MessageEmbed, MessageAttachment, Client } = require('discord.js');
const { client } = require("../bi");
var log = console.log
// const Canvas = require('canvas');
// Canvas.registerFont('./img/aAbsoluteEmpire.ttf', { family: 'aAbsoluteEmpire' })
// let banner = './img/banner2.png'

// var welcome = {};
// welcome.create = Canvas.createCanvas(1024, 500);
// welcome.context = welcome.create.getContext('2d');
// welcome.context.fillStyle = '#fff';

// var goodbye = {};
// goodbye.create = Canvas.createCanvas(1024, 500);
// goodbye.context = goodbye.create.getContext('2d');
// goodbye.context.fillStyle = '#fff';


// Canvas.loadImage(banner).then(async (img) => {
//     welcome.context.drawImage(img, 0, 0, 1024, 500);
//     welcome.context.beginPath();
//     welcome.context.arc(512, 166, 128, 0, Math.PI * 2, true);
//     welcome.context.stroke();
//     welcome.context.fill();
// })

// Canvas.loadImage(banner).then(async (img) => {
//     goodbye.context.drawImage(img, 0, 0, 1024, 500);
//     goodbye.context.beginPath();
//     goodbye.context.arc(512, 166, 128, 0, Math.PI * 2, true);
//     goodbye.context.stroke();
//     goodbye.context.fill();
// })

var guilId = '922754118202818560';
var channel1 = '1026194840154816729'; // Welcome
var channel2 = '1026194931976519770'; // Bye
var channel3 = '1026171819616632962'; // Logs


client.on('guildMemberAdd', async (member) => {
    if (member.guild.id !== guilId) return;
    var channel = member.guild.channels.cache.get(channel1)
    var logu = member.guild.channels.cache.get(channel3)

    var logembed = new MessageEmbed()
        .setAuthor({ name: `${member.user.tag} - (${member.user.id})`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setColor("GREEN")
        .setDescription(
            `• Username: <@${member.user.id}> - ${member.user.tag} (${member.user.id})\n` +
            `• Created: <t:${Math.floor(member.user.createdTimestamp / 1000.0)}:F> <t:${Math.floor(member.user.createdTimestamp / 1000.0)}:R> \n` +
            `• Joined: <t:${Math.floor(new Date().getTime() / 1000.0)}:F> - <t:${Math.floor(new Date().getTime() / 1000.0)}:R> \n`
        )
        .setFooter({ text: `Create by ® ${client.user.username} • Join`, iconURL: client.user.avatarURL({ dynamic: true }) })
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    logu.send({ embeds: [logembed] })
    var attachmemt = new MessageAttachment('img/banner.png', 'logo.png')
    var bye = new MessageEmbed()
    .setAuthor({name: `${member.guild.name} • Say Hi`, iconURL: member.guild.iconURL({dynamic: true})})
    .setColor('GREYPLE')
    .setDescription(
        `Hey **${member.user.tag}**, Welcome to **${member.guild.name}**\n\n`+
        '**Nếu bạn muốn truy cập vào Chat Chung**\n> <#968390298495516722>\n\n'+
        '**Nếu bạn muốn xem những Highlight của Gang**\n> <#1026402829482598420>\n\n'+
        '**Nếu bạn muốn xin vào Gang hoặc gặp Cấp Cao xin vui lòng chọn kênh**\n> <#971512391386923058>\n\n'+
        `Chúc bạn có thời gian vui vẻ tại **${member.guild.name}**\n\n`+
        `Members Count **#${member.guild.memberCount}**`
    )
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setFooter({text: `Create by ${client.user.name}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
    .setTimestamp()
    .setImage('attachment://logo.png')
    channel.send({ embeds: [bye],files: [attachmemt], content: `Hey <@${member.user.id}>, welcome to **${member.guild.name}**!` })

})

client.on('guildMemberRemove', async (member) => {
    if (member.guild.id !== guilId) return;
    var channel = member.guild.channels.cache.get(channel2)
    var logu = member.guild.channels.cache.get(channel3)

    var loge = new MessageEmbed()
        .setAuthor({ name: `${member.user.tag} - (${member.user.id})`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setColor("RED")
        .setDescription(
            `• Username: <@${member.user.id}> - ${member.user.tag} (${member.user.id})\n` +
            `• Created: <t:${Math.floor(member.user.createdTimestamp / 1000.0)}:F> <t:${Math.floor(member.user.createdTimestamp / 1000.0)}:R> \n` +
            `• Left: <t:${Math.floor(new Date().getTime() / 1000.0)}:F> - <t:${Math.floor(new Date().getTime() / 1000.0)}:R> \n`
        )
        .setFooter({ text: `Create by ® ${client.user.username} • Left`, iconURL: client.user.avatarURL({ dynamic: true }) })
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    logu.send({ embeds: [loge] })

    var attachmemt = new MessageAttachment('img/banner.png', 'logo.png')
    var bye = new MessageEmbed()
    .setAuthor({name: `${member.guild.name} • Say Good Bye`, iconURL: member.guild.iconURL({dynamic: true})})
    .setColor('BLURPLE')
    .setDescription(
        `Hẹn gặp lại sau **${member.user.tag}**\n\n`+
        `Members Count **#${member.guild.memberCount}**`
    )
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setFooter({text: `Create by ${client.user.name}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
    .setTimestamp()
    .setImage('attachment://logo.png')
    channel.send({ embeds: [bye],files: [attachmemt], content: `See you again <@${member.user.id}>` })
})