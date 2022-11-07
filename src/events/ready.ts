import { Client, Events } from 'discord.js';

import BaseEvent from '../commands/base/BaseEvent';

class Ready extends BaseEvent {
  constructor() {
    super(true);
    this.eventName = Events.ClientReady;
  }

  private client: Client;

  public async trigger(client: Client) {
    try {
      this.client = client;
      const servers = this.client.guilds.cache.size;
      console.log(
        `ImageBot is running on ${servers} servers: ${this.client.guilds.cache
          .map((guild) => guild.name)
          .join(', ')}`
      );
      this.client.user.setActivity('Generating images using DALL·E 2');
    } catch (error) {
      console.log(`[ERR] Error when executing Ready event`);
    }
  }
}

export default Ready;
