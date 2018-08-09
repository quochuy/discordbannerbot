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
            case "frfooter":
              app.discordActions.frFooter(args, msg);
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
    frFooter: require('./commands/discord/frbanner').makeFooter,

    displayHelp: function(msg) {
      discordHelper.sendMessageToChannel(msg.channel, `To generate your footer banner type: \`${discordHelper.commandPrefix}frfooter nickname\``);
    }
  }
};

app.init();
