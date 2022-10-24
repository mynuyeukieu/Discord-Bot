const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { config } = require('../../bi');

module.exports = {
    name: 'maketable',
    aliases: ['makectable', '', ''],
    cooldowns: 3000,
    description: 'Make new Check Time Online.',
    usage: '?makectable',
    toggleOff: false,
    developersOnly: true,
    userpermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    botpermissions: ['ADMINISTRATOR'],
    run: async (client, message, args) => {
        message.delete();
        var guild = message.guild
        var buttom = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('check')
                .setLabel('CheckIn')
                .setStyle('SUCCESS')
                .setEmoji('✔'),
            new MessageButton()
                .setCustomId('reset')
                .setLabel('Reset Time')
                .setEmoji('♻')
                .setStyle('SUCCESS')
        )
        var embed = new MessageEmbed()
            .setAuthor({ name: `${guild.name} • Time Table`, iconURL: guild.iconURL({ dynamic: true }) })
            .setDescription(
                'Xem bảng thời gian Online của Thành Viên.\n' +
                '> Xin vui lòng bấm vào Button Check để xem.\n' +
                '> Xin vui lòng bấm vào Button ResetTime để reset lại thời gian của Thành Viên\n' +
                '> Nếu bạn muốn tắt bảng Thời gian Online xin vui lòng bấm Close'
            )
            .setColor('#1877F2')
            .setFooter({ text: `Create by Rin ft Bi`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        message.channel.send({ embeds: [embed], components: [buttom] });
    },
};