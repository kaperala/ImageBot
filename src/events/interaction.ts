import { ChatInputCommandInteraction, Events } from 'discord.js';

import BaseEvent from '../base/BaseEvent';
import { commandsMap } from '../utils/maps';

class InteractionCreate extends BaseEvent {
  constructor() {
    super(false);
    this.eventName = Events.InteractionCreate;
  }

  private interaction: ChatInputCommandInteraction;

  public async trigger(interaction: ChatInputCommandInteraction) {
    try {
      this.interaction = interaction;
      if (!this.interaction.isCommand()) return;

      const commandName = this.interaction.commandName;
      const Command = commandsMap[commandName];

      if (!Command) return;

      const CommandObj = new Command(this.interaction);
      await CommandObj.execute();
    } catch (error) {
      console.log(`[ERR] Error when executing ${this.interaction.commandName}`);
    }
  }
}

export default InteractionCreate;
