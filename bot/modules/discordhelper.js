const discordjs = require('discord.js');
const client = new discordjs.Client();
const logger = require('./logger');

/**
 *
 * @type {{conf, commandPrefix: string, init: discordHelper.init, disconnect: discordHelper.disconnect, addUserToRole: discordHelper.addUserToRole, getUserById: (function(*, *=): *), getChannel: (function(*=): *), getRichEmbed: (function(): discordjs.RichEmbed), sendRichMessageToChannel: discordHelper.sendRichMessageToChannel, sendMessageToChannel: discordHelper.sendMessageToChannel, sendFileToChannel: discordHelper.sendFileToChannel, log: logger.log}}
 */
const discordHelper = {
  conf: require('./../configs/discord.json'),
  commandPrefix: '',

  /**
   *
   * @param onReadyCallback
   * @param onMessageCallback
   */
  init: function(onReadyCallback, onMessageCallback) {
    discordHelper.commandPrefix = discordHelper.conf.prefix;

    client.on('ready', function() {
      logger.log('Logged in as ' + client.user.tag);
      logger.log('commandPrefix = ' + discordHelper.commandPrefix);

      if (typeof onReadyCallback === "function") {
        onReadyCallback();
      }
    });

    client.on('error', function(err) {
      logger.log('[error][discordonerror]', err);
    });

    client.login(discordHelper.conf.token);

    if (typeof onMessageCallback === "function") {
      client.on('message', onMessageCallback);
    }
  },

  /**
   *
   */
  disconnect: function() {
    client.destroy();
  },

  /**
   *
   * @param memberId
   * @param role
   */
  addUserToRole: function(channelId, memberId, role) {
    const channel = discordHelper.getChannel(channelId);
    const memberRole = channel.guild.roles.find("name", role);
    const guild = memberRole.guild;
    const member = guild.members.get(memberId);

    member.addRole(memberRole).catch(function(err) {
      logger.log(err);
    });
  },

  /**
   *
   * @param channel
   * @param memberId
   * @returns {*}
   */
  getUserById: function(channel, memberId) {
    const member = channel.guild.members.get(memberId);
    return member;
  },

  /**
   *
   * @param channel
   * @returns {*}
   */
  getChannel: function(channel) {
    return client.channels.get(channel);
  },

  /**
   *
   * @returns {discordjs.RichEmbed}
   */
  getRichEmbed: function() {
    return new discordjs.RichEmbed();
  },

  /**
   *
   * @param channel
   * @param message
   * @param fields
   * @param file
   */
  sendRichMessageToChannel: function(channel, message, fields, file) {
    const embed = new discordjs.RichEmbed();
    if (message.hasOwnProperty('color')) {
      embed.setColor(message.color);
    }

    if (message.hasOwnProperty('title')) {
      embed.setTitle(message.title);
    }

    if (message.hasOwnProperty('description')) {
      embed.setDescription(message.description);
    }

    if (message.hasOwnProperty('author')) {
      embed.setAuthor(message.author[0], message.author[1]);
    }

    if (message.hasOwnProperty('image')) {
      embed.setImage(message.image);
    }

    if (typeof fields === "object" && fields !== null) {
      for(let fi=0; fi<fields.length; fi++) {
        const field = fields[fi];
        embed.addField(field.name, field.value);
      }
    }

    if (typeof file !== undefined) {
      embed.attachFile(file);
    }

    channel.send(embed)
      .catch(function(err) {
        logger.log("[error][sendrichmessagetochannel]", err);
      });
  },

  /**
   *
   * @param channel
   * @param message
   */
  sendMessageToChannel: function(channel, message) {
    channel.send(message);
  },

  /**
   *
   * @param channel
   * @param message
   * @param file
   */
  sendFileToChannel: function(channel, message, file) {
    channel.send(message, {files: [file]});
  }
};

module.exports = discordHelper;