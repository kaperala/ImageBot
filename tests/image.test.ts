import dotenv from 'dotenv';

import ImageCommand, { getBuilder } from '../src/commands/image';
import { executeCommand, getParsedCommand } from './testUtilities';

jest.setTimeout(15000);

describe('Test generating image with only description', () => {
  it('replies to the user that everything is working', async () => {
    dotenv.config();
    const stringCommand = '/image description: testing picture';
    const commandBuilder = getBuilder();
    const command = getParsedCommand(stringCommand, commandBuilder);
    const spy = await executeCommand(ImageCommand, command);
    expect(spy).toHaveBeenCalledWith(
      'Generated 1 image(s) with the following description: "testing picture"'
    );
  });
});
