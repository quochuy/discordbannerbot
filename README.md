# Discord Banner Bot
## Description
This is a educational project to show how to make a Discord bot that generates custom banners for members of a community. You will have to customize it to your needs.

## Requirements
You will need to have a Docker environment ready or a Linux environment with Node/NPM and libgd2-dev installed.

## Installation with docker
Install Docker: https://docs.docker.com/install/

Install Docker Compose: https://docs.docker.com/compose/install/

### Installing on Ubuntu 16.04:
> apt-get update

> apt-get install docker-ce

> curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s\`-\`uname -m\` -o /usr/local/bin/docker-compose

> chmod 755 /usr/local/bin/docker-compose

If you want to run docker with another user than root, add your username into the docker group

> git clone https://github.com/quochuy/discordbannerbot.git

> cd discordbannerbot

## Customizing the banners
You should clone or replace any files containing the string "makebanner".

The blank banner in PNG format: bot/assets/images/makebanner.png

The module that will receive requests from a Discord channel: bot/commands/discord/makebannerer.js

The module that will actually generate the customize banner in PNG format: bot/modules/makebanner.js

Additionally, edit the main module to bot.js in "app.discordActions", add/replace "frFooter" with your own. 

Finally, edit the bot/module/makebanner.js (or your cloned one) and customize the parameters at the top (text color, font files etc...)

## Linking to a Discord server
Follow the steps on the following page to create your own Discord server, app and bot:
https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token

Copy bot/configs/discord.distrib.json discord.json as config.json and customize it with your app token.

You are now ready to Launch your bot.

## Build and launch the bot
- Build: `docker-compose build` (CTRL + C to exit)
- Launch: `docker-compose up`
- To launch in the background: `docker-compose up -d`
- To stop the container running in the background: `docker-compose down`
- To check the bot output: `tail -f bot/logs/bot.log`

If you make some changes that does not require any extra NPM modules, you can just restart the bot to see the changes: `docker-compose restart`.