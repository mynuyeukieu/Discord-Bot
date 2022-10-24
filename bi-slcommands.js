const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { clienttoken } = require('./botconfig/main.json')
const fs = require('node:fs');
const path = require('node:path');
const clientId = '911656694189285387';

const commands = [];
const commandsPath = path.join(__dirname, 'slashcommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(clienttoken);

createSlah()

async function createSlah() {
    try {
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        )
        console.log('Successfully registered application commands.');
    } catch (e) {
        console.log('Error:', e);
    }
}