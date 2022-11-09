
# 🧠 ImageBot, a DALL·E 2 Discord Bot

ImageBot is a simple Discord bot for using [OpenAi's DALL·E 2](https://openai.com/dall-e-2/) image generation API on Discord servers. It is written in TypeScript using [discord.js](https://discord.js.org/) and includes unit tests written with [Jest](https://jestjs.io/).




## ⚙️ Environment Variables

To run this bot, you need to create an .env file that includes the needed enviroment variables. I have included a [template](https://github.com/kvllu/ImageBot/blob/main/.env_template) for this purpose, but heres a quick rundown of the variables:

    DISCORD_TOKEN= //Discord token for your bot.
    OPENAI_TOKEN= //Token for OpenAi's DALL·E 2 API.
    CLIENT_ID= //Client ID of your bot.
    GUILD_ID= //Guild ID of a development server, this is used to deploy the commands to only 1 server.


## 🐬 Running with Docker

Running ImageBot with Docker is very easy, you can do it with my [Docker image](https://hub.docker.com/repository/docker/kvllu/imagebot/). Note that you need to provide the environment variables with **-e** option or use your platform provider's tools to create them.
```bash
docker run -d \
    --name imagebot \
    -e DISCORD_TOKEN="discord_token" \
    -e OPENAI_TOKEN="openai_token" \
    -e CLIENT_ID="clientid" \
	kvllu/imagebot
```
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

Start the bot

```bash
  npm start
```


## 📋 Features and Commands

ImageBot is in early development, it currently has the following:

#### Generating Images
/image command with options:
- Description for generating the image(s). ⚠️
- Resolution of the images to be generated.
- Number of Images to be generated

Options with ⚠️ are not optional.

**Note: Discord Client ID of the user that executed the command will also be included in the API call to prevent spam and abuse.**
## 🧪 Running Tests

This project provides unit tests made with Jest to help with development. To run the tests, run the following command

```bash
  npm run test
```
