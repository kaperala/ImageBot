import { Client, GatewayIntentBits } from 'discord.js';

import { eventsMap } from './utils/maps';

require('dotenv').config();

class Bot {
  private client: Client;
  private token: string;

  constructor(client: Client, token: string) {
    this.client = client;
    this.token = token;
    this.client.login(this.token);
  }

  public setEvents(): void {
    Object.keys(eventsMap).forEach((key) => {
      const Event = new eventsMap[key]();

      if (Event.once) {
        this.client.once(Event.eventName, (...args) => Event.trigger(...args));
      } else {
        this.client.on(Event.eventName, (...args) => Event.trigger(...args));
      }
    });
  }
}

export default function init() {
  console.log('Staring ImageBot...');
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const token = process.env.DISCORD_TOKEN;
  const bot = new Bot(client, token);
  bot.setEvents();
}

init();
