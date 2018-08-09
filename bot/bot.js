const discordHelper = require('./modules/discordhelper');
const logger = require('./modules/logger');

const app = {
  init: function() {
    logger.log('Starting Banner Bot...');
    discordHelper.init(app.discordEvents.onReady, app.discordEvents.onMessage);
  },

  discordEvents: {
    /**
     * Event handler for Discord onready
     */
    onReady: function() {
      logger.log('Now listening on Discord!');
    },

    /**
     * Event handler for Discord onmessage
     * @param msg
     */
    onMessage: function(msg) {
      if (!msg.author.bot) {
        const args = msg.content.slice(discordHelper.commandPrefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (msg.content.startsWith(discordHelper.commandPrefix)) {
          switch(command) {
            // Duplicate/replace this with your own
            case "makebanner":
              app.discordActions.makeBanner(args, msg);
              break;

            case 'help':
            default:
              app.discordActions.displayHelp(msg);
              break;
          }
        }
      }
    }
  },

  /**
   * Loading discord commands
   */
  discordActions: {
    // Duplicate/replace this with your own
    makeBanner: require('./commands/discord/makebanner').generate,

    displayHelp: function(msg) {
      discordHelper.sendMessageToChannel(msg.channel, `To generate your footer banner type: \`${discordHelper.commandPrefix}makefooter nickname\``);
    }
  }
};

app.init();
