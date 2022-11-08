import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js';
import {
  Configuration,
  CreateImageRequestSizeEnum,
  ImagesResponseDataInner,
  OpenAIApi
} from 'openai';

import { GenerationConfig } from '../types/types';
import BaseCommand from './base/BaseCommand';

export const getBuilder = () => {
  const builder = new SlashCommandBuilder();
  builder
    .setName('image')
    .setDescription('Generates an image using OpenAI`s')
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('Description for the image generation.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('resolution')
        .setDescription(
          'The resolution of the generated image(s). (default is 1024x1024)'
        )
        .setRequired(false)
        .addChoices(
          { name: '1024x1024', value: '1024x1024' },
          { name: '512x512', value: '512x512' },
          { name: '256x256', value: '256x256' }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('The number of images to generate. (1-5, default is 1)')
        .setRequired(false)
    );
  return builder;
};

class ImageCommand extends BaseCommand {
  constructor(interaction: ChatInputCommandInteraction) {
    super(interaction);

    this.cooldown = 60;
  }

  private setRequestOptions(): GenerationConfig {
    const requestOptions: GenerationConfig = {
      description: this.interaction.options.getString('description'),
      nOfImages: this.interaction.options.getInteger('amount') ?? 1,
      resolution:
        (this.interaction.options.getString(
          'resolution'
        ) as CreateImageRequestSizeEnum) ?? '1024x1024',
      responseFormat: 'b64_json',
      userID: this.interaction.user.id,
      OpenAiConfiguration: new Configuration({
        apiKey: process.env.OPENAI_TOKEN
      })
    };
    return requestOptions;
  }

  private async queryAndReply(openai: OpenAIApi, options: GenerationConfig) {
    await openai
      .createImage({
        prompt: options.description,
        n: options.nOfImages,
        size: options.resolution,
        response_format: options.responseFormat,
        user: options.userID
      })
      .then((response) => {
        this.editReply(
          `Generated ${options.nOfImages} image(s) with the following description: "${options.description}"`
        );
        //Send each image as a followUp reply.
        response.data.data.forEach((element: ImagesResponseDataInner) => {
          const buf = Buffer.from(element.b64_json, 'base64');
          const attachment = new AttachmentBuilder(buf, {
            name: 'openai_result.png'
          });
          this.followUp({ files: [attachment] });
        });
      })
      .catch((error) => {
        this.editReply(
          'Something went wrong, the API call limit could be reached or the description was inappropriate, please try again later.'
        );
        console.log(error);
      });
  }

  public async execute() {
    await this.deferReply();
    const options = this.setRequestOptions();
    const openai = new OpenAIApi(options.OpenAiConfiguration);
    await this.queryAndReply(openai, options);
  }
}

export default ImageCommand;
