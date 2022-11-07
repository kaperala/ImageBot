/* eslint-disable @typescript-eslint/typedef */
import MockDiscord from './mocks';

export const optType = {
  3: String,
  4: Number,
  5: Boolean,
  10: Number
};

function getNestedOptions(options) {
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

export function getParsedCommand(stringCommand: string, commandData) {
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
  return {
    id: name,
    name,
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
}

export function embedContaining(content) {
  return {
    embeds: expect.arrayContaining([expect.objectContaining(content)]),
    fetchReply: true
  };
}

export function embedContainingWithoutFetchReply(content) {
  return {
    embeds: expect.arrayContaining([expect.objectContaining(content)])
  };
}

export function fieldContainingValue(expectedValue) {
  return embedContainingWithoutFetchReply({
    fields: expect.arrayContaining([
      expect.objectContaining({
        value: expect.stringContaining(expectedValue)
      })
    ])
  });
}

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function mockInteractionAndSpyReply(command) {
  const discord = new MockDiscord({ command });
  const interaction = discord.getInteraction();
  const spy = jest.spyOn(interaction, 'editReply');
  return { interaction, spy };
}

export async function executeCommandAndSpyReply(command, content) {
  const { interaction, spy } = mockInteractionAndSpyReply(content);
  await command.execute(interaction);
  return spy;
}
