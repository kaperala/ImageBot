import ImageCommand from '../commands/image';
import InteractionCreate from '../events/interaction';
import Ready from '../events/ready';

export const commandsMap = {
  image: ImageCommand
};

export const eventsMap = {
  ready: Ready,
  interactioncreate: InteractionCreate
};
