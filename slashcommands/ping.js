const { SlashCommandBuilder } = require('@discordjs/builders');
const {CommandInteraction} = require('discord.js');
module.exports = {
    /**
    * @param {CommandInteraction} interaction
    */
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async run(client, interaction) {
        return interaction.reply('Pong!');
    },
};