import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';
import {
  Configuration,
  ImagesResponse,
  ImagesResponseDataInner,
  OpenAIApi
} from 'openai';

import { b64_json } from './base64';

export default class MockOpenAi {
  private openAiApi!: OpenAIApi;
  private imageResponse!: ImagesResponse;
  private imageDataInner: Array<ImagesResponseDataInner> = [];
  private headers!: AxiosResponseHeaders;
  private response!: AxiosResponse<ImagesResponse, any>;
  private config!: AxiosRequestConfig<any>;

  constructor(configuration: Configuration, nOfImages: number) {
    this.mockImagesDataInner(nOfImages);
    this.mockImagesResponse(nOfImages);
    this.mockResponse();
    this.mockOpenAIApi(configuration);
  }

  public getOpenAiApi() {
    return this.openAiApi;
  }

  private mockImagesDataInner(nOfImages: number) {
    for (let i = 0; i < nOfImages; i++) {
      this.imageDataInner.push({
        b64_json: b64_json
      });
    }
  }

  private mockImagesResponse(nOfImages: number) {
    this.imageResponse = {
      created: nOfImages,
      data: this.imageDataInner
    };
  }

  private mockResponse() {
    this.response = {
      data: this.imageResponse,
      status: 200,
      statusText: 'status',
      headers: this.headers,
      config: this.config
    };
  }

  private mockOpenAIApi(configuration: Configuration) {
    this.openAiApi = Reflect.construct(OpenAIApi, [configuration]);
    this.openAiApi.createImage = jest.fn().mockResolvedValue(this.response);
  }
}
