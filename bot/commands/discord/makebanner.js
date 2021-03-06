// Duplicate/replace this file with your own

const discordhelper = require('../../modules/discordhelper.js');
const makebanner = require('../../modules/makebanner.js');
const logger = require('../../modules/logger');

const makeBannerCmd = {
  /**
   *
   * @param args
   * @param msg
   * @returns {Promise<void>}
   */
  generate: async function(args, msg) {
    const account = args[0];
    const valid = await makeBannerCmd.validateMember(account);

    logger.log("Received a request for a banner for", account);

    if (valid === true) {
      logger.log("Valid member", account);
      const bannerPath = await makebanner.generate(account);
      if (bannerPath) {
        discordhelper.sendFileToChannel(msg.channel, `Banner for ${account}:`, bannerPath);
      }
    } else {
      logger.log("Invalid member", account);
      discordhelper.sendMessageToChannel(msg.channel, `Sorry, ${account} is not a verified community member`);
    }
  },

  /**
   * Validate a member
   * @param account
   * @returns {Promise<boolean>}
   */
  validateMember: async function (account) {
    logger.log("Validating member", account);
    // Here should be your validation code, it could be an array of known members, loading a JSON file,
    // connecting to a DB, using steem.js to check if the user is followed by a bot etc...
    return true;
  },
};

module.exports = makeBannerCmd;