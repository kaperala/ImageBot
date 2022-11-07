import dotenv from 'dotenv';

import { executeCommandAndSpyReply, getParsedCommand } from './testUtilities';

const commandData = require('../src/commands/image');
jest.setTimeout(15000);

describe('Test generating image with only description', () => {
  it('replies to the user that everything is working', async () => {
    dotenv.config();
    const stringCommand = '/image description: testing picture';
    const command = getParsedCommand(stringCommand, commandData.data);
    const spy = await executeCommandAndSpyReply(commandData, command);
    expect(spy).toHaveBeenCalledWith(
      'Generated 1 image(s) with the following description: "testing picture"'
    );
  });
});
