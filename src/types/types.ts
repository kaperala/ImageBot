import {
  Configuration,
  CreateImageRequestResponseFormatEnum,
  CreateImageRequestSizeEnum
} from 'openai';

export interface GenerationConfig {
  description: string;
  nOfImages: number;
  resolution: CreateImageRequestSizeEnum;
  responseFormat: CreateImageRequestResponseFormatEnum;
  userID: string;
  OpenAiConfiguration: Configuration;
}
