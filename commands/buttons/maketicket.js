const Discord = require('discord.js');
const { config } = require('../../bi');

module.exports = {
    name: 'rin001',
    aliases: ['cticket', '', ''],
    cooldowns: 3000,
    description: 'Make new system ticket.',
    usage: '?rin001',
    toggleOff: false,
    developersOnly: true,
    userpermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    botpermissions: ['ADMINISTRATOR'],
    run: async (client, message, args) => {
        message.delete({ timeout: 1e3 * 5 })
        var but1 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId('btnCreate')
                .setLabel('Create')
                .setStyle('SUCCESS')
                .setEmoji('🔓'),
            new Discord.MessageButton()
                .setLabel('Support')
                .setStyle('LINK')
                .setURL('https://discordjs.guide')
        )
        var emb = new Discord.MessageEmbed()
            .setAuthor({ name: `🎫 Ticket Support's ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor('GREEN')
            .setDescription(
                'Xin chào bạn, nếu bạn đang có những câu hỏi mà không thể nói bạn có thể tạo Ticket cho riêng mình. Xin vui lòng làm theo hướng dẫn bên dưới !\n\n'
                + '> Please just click the BUTTON below 👇.'
            )
            .setFooter({ text: `Create By © ${client.user.username}`, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [emb], components: [but1] });
    },
};