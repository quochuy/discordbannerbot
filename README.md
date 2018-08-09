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

Copy configs/discord.distrib.json discord.json as config.json and customize it.

- Build: `docker-compose build` (CTRL + C to exit)
- Launch: `docker-compose up`
- To launch in the background: `docker-compose up -d`
- To stop the container running in the background: `docker-compose down`
- To check the bot output: `tail -f bot/logs/bot.log`

## Customizing the banners
You should clone or replace any files containing the string "frbanner".

The blank banner in PNG format: bot/assets/images/frbanner.png

The module that will receive requests from a Discord channel: bot/commands/discord/frbanner.js

The module that will actually generate the customize banner in PNG format: bot/modules/makefrbanner.js

Additionally, edit the main module to bot.js in "app.discordActions", add/replace "frFooter" with your own. 

