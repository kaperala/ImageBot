import dotenv from 'dotenv';

import ImageCommand, { getBuilder } from '../src/commands/image';
import { executeCommand, getParsedCommand } from './testUtilities';

describe('Test generating image with only description', () => {
  it('Replies that 1 image has been generated with matching description', async () => {
    dotenv.config();
    const stringCommand = '/image description: testing picture';
    const commandBuilder = getBuilder();
    const command = getParsedCommand(stringCommand, commandBuilder);
    const spy = await executeCommand(ImageCommand, command);
    expect(spy).toHaveBeenCalledWith(
      'Generated 1 image(s) (256x256) with the following description: "testing picture"'
    );
  });
});

describe('Test generating image with description and amount', () => {
  it('Replies that 5 images has been generated with matching description', async () => {
    dotenv.config();
    const stringCommand = '/image description: testing pictures amount: 5';
    const commandBuilder = getBuilder();
    const command = getParsedCommand(stringCommand, commandBuilder);
    const spy = await executeCommand(ImageCommand, command);
    expect(spy).toHaveBeenCalledWith(
      'Generated 5 image(s) (256x256) with the following description: "testing pictures"'
    );
  });
});

describe('Test generating image with description, amount and resolution', () => {
  it('Replies that 5 images has been generated with matching description and resolution', async () => {
    dotenv.config();
    const stringCommand =
      '/image description: testing pictures amount: 3 resolution: 1024x1024';
    const commandBuilder = getBuilder();
    const command = getParsedCommand(stringCommand, commandBuilder);
    const spy = await executeCommand(ImageCommand, command);
    expect(spy).toHaveBeenCalledWith(
      'Generated 3 image(s) (1024x1024) with the following description: "testing pictures"'
    );
  });
});
