import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import * as fs from 'node:fs';

dotenv.config();

const commands = [];
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.ts'));

console.log(commandFiles);
for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.getBuilder().toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    let data: Array<SlashCommandBuilder>;
    if (process.env.GUILD_ID) {
      data = (await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: commands }
      )) as Array<SlashCommandBuilder>;
    } else {
      data = (await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      )) as Array<SlashCommandBuilder>;
    }

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
