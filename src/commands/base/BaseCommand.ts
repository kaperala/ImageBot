import {
  ChatInputCommandInteraction,
  InteractionReplyOptions,
  InteractionResponse,
  Message,
  MessagePayload
} from 'discord.js';

export default abstract class BaseCommand {
  protected interaction: ChatInputCommandInteraction;
  protected cooldown: number;

  constructor(interaction: ChatInputCommandInteraction) {
    this.interaction = interaction;

    //Base cooldown is 10 seconds if not overrided.
    this.cooldown = 10;
  }

  protected async deferReply(): Promise<Message | InteractionResponse> {
    return await this.interaction.deferReply();
  }

  protected async followUp(
    content: string | MessagePayload | InteractionReplyOptions
  ): Promise<Message> {
    return await this.interaction.followUp(content);
  }

  protected async editReply(content: string): Promise<Message> {
    return await this.interaction.editReply(content);
  }
}
