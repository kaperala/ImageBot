import {
  ApplicationCommand,
  BaseChannel,
  ChatInputCommandInteraction,
  Client,
  Guild,
  GuildChannel,
  GuildMember,
  GuildTextBasedChannel,
  Message,
  TextChannel,
  User
} from 'discord.js';

export default class MockDiscord {
  private client!: Client;
  private guild!: Guild;
  private channel!: BaseChannel;
  private guildChannel!: GuildChannel;
  private textChannel!: GuildTextBasedChannel;
  private user!: User;
  private guildMember!: GuildMember;
  public message!: Message;
  public interaction!: ChatInputCommandInteraction;

  constructor(options: any) {
    this.mockClient();
    this.mockGuild();
    this.mockChannel();
    this.mockGuildChannel();
    this.mockTextChannel();

    this.mockUser();
    this.mockGuildMember();
    this.mockMessage(options?.message?.content as string);
    this.mockInteracion(options?.command as ApplicationCommand);

    this.mockPrototypes();

    this.guild.channels.cache.set(this.textChannel.id, this.textChannel);
    this.client.channels.cache.set(this.textChannel.id, this.textChannel);
    this.client.guilds.cache.set(this.guild.id, this.guild);
  }

  public getClient(): Client {
    return this.client;
  }

  public getGuild(): Guild {
    return this.guild;
  }

  public getChannel(): BaseChannel {
    return this.channel;
  }

  public getGuildChannel(): GuildChannel {
    return this.guildChannel;
  }

  public getTextChannel(): GuildTextBasedChannel {
    return this.textChannel;
  }

  public getUser(): User {
    return this.user;
  }

  public getGuildMember(): GuildMember {
    return this.guildMember;
  }

  public getMessage(): Message {
    return this.message;
  }

  public getInteraction(): ChatInputCommandInteraction {
    return this.interaction;
  }

  private mockPrototypes() {
    TextChannel.prototype.send = jest.fn().mockImplementation(() => {
      return {
        react: jest.fn()
      };
    });

    Message.prototype.edit = jest.fn();
  }

  private mockClient(): void {
    this.client = new Client({ intents: [] });
    this.client.login = jest.fn(() => Promise.resolve('LOGIN_TOKEN'));
  }

  private mockGuild(): void {
    this.guild = Reflect.construct(Guild, [
      this.client,
      {
        unavailable: false,
        id: 'guild-id',
        name: 'guild name',
        icon: 'guild icon',
        splash: 'aplash url',
        region: 'eu-west',
        member_count: 10,
        large: false,
        features: [],
        application_id: 'application-id',
        afkTimeout: 1000,
        afk_channel_id: 'afk-channel-id',
        system_channel_id: 'system-channel-id',
        embed_enabled: true,
        verification_level: 2,
        explicit_content_filter: 3,
        mfa_level: 8,
        joined_at: new Date('2022-01-01').getTime(),
        owner_id: 'owner-id',
        channels: [],
        roles: [],
        presences: [],
        voice_states: [],
        emojis: []
      }
    ]);
  }

  private mockChannel(): void {
    this.channel = Reflect.construct(BaseChannel, [
      this.client,
      {
        id: 'channel-id'
      }
    ]);
  }

  private mockGuildChannel(): void {
    this.guildChannel = Reflect.construct(GuildChannel, [
      this.guild,
      {
        ...this.channel,
        name: 'guild-channel',
        position: 1,
        parent_id: '123456789',
        permission_overwrites: []
      }
    ]);
  }

  private mockTextChannel(): void {
    this.textChannel = Reflect.construct(TextChannel, [
      this.guild,
      {
        ...this.guildChannel,
        topic: 'topic',
        nsfw: false,
        last_message_id: '123456789',
        lastPinTimestamp: new Date('2022-01-01').getTime(),
        rate_limit_per_user: 0
      }
    ]);
  }

  private mockUser(): void {
    this.user = Reflect.construct(User, [
      this.client,
      {
        id: 'user-id',
        username: 'USERNAME',
        discriminator: 'user#0000',
        avatar: 'user avatar url',
        bot: false
      }
    ]);
  }

  private mockGuildMember(): void {
    this.guildMember = Reflect.construct(GuildMember, [
      this.client,
      {
        id: BigInt(1),
        deaf: false,
        mute: false,
        self_mute: false,
        self_deaf: false,
        session_id: 'session-id',
        channel_id: 'channel-id',
        nick: 'nick',
        joined_at: new Date('2022-01-01').getTime(),
        user: this.user,
        roles: []
      },
      this.guild
    ]);
  }

  private mockMessage(content: string): void {
    this.message = Reflect.construct(Message, [
      this.client,
      {
        id: BigInt(10),
        type: 'DEFAULT',
        content: content,
        author: this.user,
        webhook_id: null,
        member: this.guildMember,
        pinned: false,
        tts: false,
        nonce: 'nonce',
        embeds: [],
        attachments: [],
        edited_timestamp: null,
        reactions: [],
        mentions: [],
        mention_roles: [],
        mention_everyone: [],
        hit: false
      },
      this.textChannel
    ]);
    this.message.react = jest.fn();
  }

  private mockInteracion(command: ApplicationCommand): void {
    if (!command) return;
    this.interaction = Reflect.construct(ChatInputCommandInteraction, [
      this.client,
      {
        data: command,
        id: BigInt(1),
        user: this.guildMember,
        channel_id: 'channel-id'
      }
    ]);

    this.interaction.reply = jest.fn();
    this.interaction.followUp = jest.fn();
    this.interaction.deferReply = jest.fn();
    this.interaction.editReply = jest.fn();
    this.interaction.guildId = this.guild.id;
    this.interaction.isCommand = jest.fn(() => true);
  }
}
