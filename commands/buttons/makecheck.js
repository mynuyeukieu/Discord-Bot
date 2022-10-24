const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { config } = require('../../bi');

module.exports = {
    name: 'makecheck',
    aliases: ['makecheck', '', ''],
    cooldowns: 3000,
    description: 'Make new Check Time Online.',
    usage: '?makecheck',
    toggleOff: false,
    developersOnly: true,
    userpermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    botpermissions: ['ADMINISTRATOR'],
    run: async (client, message, args) => {
        message.delete();
        var guild = message.guild;
        var buttom = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('checkin')
                .setLabel('CheckIn')
                .setStyle('SUCCESS')
                .setEmoji('📥'),
            new MessageButton()
                .setCustomId('checkout')
                .setLabel('CheckOut')
                .setStyle('DANGER')
                .setEmoji('📤'),
            new MessageButton()
                .setCustomId('createchannel')
                .setLabel('Khởi Tạo')
                .setStyle('PRIMARY')
                .setEmoji('⚙')
        )
        var embed = new MessageEmbed()
            .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
            .setDescription(
                'Xin vui lòng Check In trước khi làm việc.\n' +
                'Nếu bạn hết giờ làm xin vui lòng Check Out.\n' +
                '> Lưu ý Nếu chưa có Room Check In & Check Out, xin vui lòng bấm vào và chỉnh quyền theo vai trò thích hợp.'
            )
            .setColor('#1877F2')
            .setFooter({ text: `Create by Rin ft Bi`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        message.channel.send({ embeds: [embed], components: [buttom] });
    },
};