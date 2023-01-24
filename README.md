
# 🧠 ImageBot, a DALL·E 2 Discord Bot

ImageBot is a simple Discord bot for using [OpenAi's DALL·E 2](https://openai.com/dall-e-2/) image generation API on Discord servers. It is written in TypeScript using [discord.js](https://discord.js.org/) and includes unit tests written with [Jest](https://jestjs.io/).

You can [contact me](mailto:kalle@perala.dev) for a demo of the bot or host it on your own. I am not running the bot publicly as OpenAi's pricing is not cheap.


## 📝 Requirements

To run the bot you will need:
- Node.js v16.9.0 or higher
- Discord Bot Token and a Client ID of your bot //**[DiscordJS Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**  
- OpenAi Token //**[OpenAi documentation](https://beta.openai.com/docs/introduction/overview)**  


## ⚙️ Environment Variables

To run this bot, you need to create an .env file that includes the needed enviroment variables. I have included a [template](https://github.com/kvllu/ImageBot/blob/main/.env_template) for this purpose, but heres a quick rundown of the variables:

    DISCORD_TOKEN= //Discord token for your bot.
    OPENAI_TOKEN= //Token for OpenAi's DALL·E 2 API.
    CLIENT_ID= //Client ID of your bot.
    GUILD_ID= //Guild ID of a development server, this is used to deploy the commands to only 1 Discord server.


## 🐬 Running with Docker

Running ImageBot with Docker is very easy, you can do it with my [Docker image](https://hub.docker.com/r/kvllu/imagebot). Note that you need to provide the environment variables with **-e** option or use your platform provider's tools to create them. 

```bash
docker run -d \
    --name imagebot \
    -e DISCORD_TOKEN="discord_token" \
    -e OPENAI_TOKEN="openai_token" \
    -e CLIENT_ID="clientid" \ 
	kvllu/imagebot
```
(Add **-e GUILD_ID** if you want to run the bot on 1 Discord server only)
## 🚀 Run Locally

Clone the project

```bash
  git clone https://github.com/kvllu/ImageBot/
```

Go to the project directory

```bash
  cd ImageBot
```

Install dependencies

```bash
  npm install
```

Configure the .env file and deploy the commands to the Discord API

```bash
  npm run deploy-commands
```

Rename/create and configure the .env file and run the bot

```bash
  npm start
```


## 📋 Features and Commands

ImageBot is in early development, it currently has the following:

#### Generating Images
![logo](https://i.imgur.com/XVFl4um.png)

/image command with options:
- Description for generating the image(s). ⚠️
- Resolution of the images to be generated.
- Number of Images to be generated

Options with ⚠️ are required.

**Note: Discord Client ID of the user that executed the command will also be included in the API call to prevent spam and abuse.**
## 🧪 Running Tests

This project provides unit tests made with Jest to help with development. To run the tests, run the following command

```bash
  npm run test
```
