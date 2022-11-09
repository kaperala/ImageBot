import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { RawApplicationCommandData } from 'discord.js/typings/rawDataTypes';
import { Configuration, CreateImageRequestSizeEnum } from 'openai';

import ImageCommand from '../src/commands/image';
import { GenerationConfig } from '../src/types/types';
import MockDiscord from './DiscordMock';
import MockOpenAi from './OpenAiMock';

export const optType = {
  3: String,
  4: Number,
  5: Boolean,
  10: Number
};

function getNestedOptions(options: any) {
  return options.reduce((allOptions, option) => {
    if (!option.options) return [...allOptions, option];
    const nestedOptions = getNestedOptions(option.options);
    return [option, ...allOptions, ...nestedOptions];
  }, []);
}

function castToType(value: string, typeId: number) {
  const typeCaster = optType[typeId];
  return typeCaster ? typeCaster(value) : value;
}

export function getParsedCommand(
  stringCommand: string,
  commandData: SlashCommandBuilder
): RawApplicationCommandData {
  const options = getNestedOptions(commandData.options);
  const optionsIndentifiers = options.map((option) => `${option.name}:`);
  const requestedOptions = options.reduce((requestedOptions, option) => {
    const identifier = `${option.name}:`;
    if (!stringCommand.includes(identifier)) return requestedOptions;
    const remainder = stringCommand.split(identifier)[1];

    const nextOptionIdentifier = remainder
      .split(' ')
      .find((word) => optionsIndentifiers.includes(word));
    if (nextOptionIdentifier) {
      const value = remainder.split(nextOptionIdentifier)[0].trim();
      return [
        ...requestedOptions,
        {
          name: option.name,
          value: castToType(value, option.type),
          type: option.type
        }
      ];
    }

    return [
      ...requestedOptions,
      {
        name: option.name,
        value: castToType(remainder.trim(), option.type),
        type: option.type
      }
    ];
  }, []);
  const optionNames = options.map((option) => option.name);
  const splittedCommand = stringCommand.split(' ');
  const name = splittedCommand[0].replace('/', '');
  const subcommand = splittedCommand.find((word) => optionNames.includes(word));

  const data: RawApplicationCommandData = {
    id: name,
    name,
    application_id: 'application_id',
    description: 'application description',
    default_member_permissions: null,
    version: '1.0',
    type: 1,
    options: subcommand
      ? [
          {
            name: subcommand,
            type: 1,
            options: requestedOptions
          }
        ]
      : requestedOptions
  };
  return data;
}

export function createInteractionAndSpy(command: RawApplicationCommandData) {
  const discord = new MockDiscord({ command });
  const interaction = discord.getInteraction();
  const spy = jest.spyOn(interaction, 'editReply');
  return { interaction, spy };
}

export function createOpenAi(generationConfig: GenerationConfig) {
  const openAiConfig = generationConfig.OpenAiConfiguration;
  const nOfImages = generationConfig.nOfImages;
  const openAiMock = new MockOpenAi(openAiConfig, nOfImages);
  return openAiMock.getOpenAiApi();
}

export function createGenerationConfig(
  interaction: ChatInputCommandInteraction
) {
  const generationConfig: GenerationConfig = {
    description: interaction.options.getString('description'),
    nOfImages: interaction.options.getInteger('amount') ?? 1,
    resolution:
      (interaction.options.getString(
        'resolution'
      ) as CreateImageRequestSizeEnum) ?? '256x256',
    responseFormat: 'b64_json',
    userID: interaction.user.id,
    OpenAiConfiguration: new Configuration({
      apiKey: 'sk-apikey'
    })
  };

  return generationConfig;
}

export async function executeCommand(
  command: typeof ImageCommand,
  content: RawApplicationCommandData
) {
  const { interaction, spy } = createInteractionAndSpy(content);
  const CommandObject: ImageCommand = new command(interaction);
  const generationConfig = createGenerationConfig(interaction);
  const openai = createOpenAi(generationConfig);
  await CommandObject.queryAndReply(openai, generationConfig);
  return spy;
}
