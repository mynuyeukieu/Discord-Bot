const { client } = require("../bi");
const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");
const ms = require("ms");
const { developerID } = require("../botconfig/main.json");
const { clientavatar } = require("../botconfig/main.json");
const { clientname } = require("../botconfig/main.json");
const prefix = client.config.prefix;
const { randomMessages_Cooldown } = require("../botconfig/main.json");
client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);
    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");
    if (cmd.length === 0) return

    const command =
        client.commands.get(cmd.toLowerCase()) ||
        client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
    if (!command) return
    if (command.toggleOff) {
        let toggleoff_embed = new MessageEmbed()
            .setTitle(
                `:x: | That Command Has Been Disabled By The Developers! Please Try Later.`
            )
            .setColor("RED")
            .setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
            .setTimestamp();
        return message.reply({ embeds: [toggleoff_embed] });
    } else if (!message.member.permissions.has(command.userpermissions || [])) {
        let userperms_embed = new MessageEmbed()
            .setTitle(`:x: | You Don't Have Permissions To Use The Command!`)
            .setColor("RED")
            .setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
            .setTimestamp();
        return message.reply({ embeds: [userperms_embed] });
    } else if (!message.guild.me.permissions.has(command.botpermissions || [])) {
        let botperms_embed = new MessageEmbed()
            .setTitle(`:x: | I Don't Have Permissions To Use The Command!`)
            .setColor("RED")
            .setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
            .setTimestamp();
        return message.reply({ embeds: [botperms_embed] });
    } else if (command.developersOnly) {
        if (!developerID.includes(message.author.id)) {
            let developersOnly_embed = new MessageEmbed()
                .setTitle(`:x: | Only Developers Can Use That Command!`)
                .setDescription(
                    `Developers: ${developerID.map((v) => `<@${v}>`).join(",")}`
                )
                .setColor("RED")
                .setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
                .setTimestamp();
            return message.reply({ embeds: [developersOnly_embed] });
        }
    } else if (command.cooldowns) {
        if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
            let cooldown_embed = new MessageEmbed()
                .setTitle(
                    `${randomMessages_Cooldown[
                    Math.floor(Math.random() * randomMessages_Cooldown.length)
                    ]
                    }`
                )
                .setDescription(
                    `You Need To Wait \`${ms(
                        client.cooldowns.get(`${command.name}${message.author.id}`) -
                        Date.now(),
                        { long: true }
                    )}\` To Use \`${prefix}${command.name}\` again!`
                )
                .setColor("BLUE")
                .setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
                .setTimestamp();

            return message.reply({ embeds: [cooldown_embed] });
        }

        client.cooldowns.set(
            `${command.name}${message.author.id}`,
            Date.now() + command.cooldowns
        );

        setTimeout(() => {
            client.cooldowns.delete(`${command.name}${message.author.id}`);
        }, command.cooldowns);
    }
    await command.run(client, message, args);
});
