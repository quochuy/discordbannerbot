// Duplicate/replace this file with your own

const gd = require('node-gd');
const logger = require('../modules/logger');

/**
 * Customization *****************
 */
// Some parameter to display the username
const textColor = [255, 222, 0];
const textSize = 32;
const textPositionY = 147;
const textLetterSpacing = 5;
const textAngle = 0;

// This is actually where the text should be ending at (right-align)
const usernameBarWidth = 620;

const sourceFont = __dirname + '/../assets/fonts/Times New Roman.ttf';
const blankBanner = __dirname + '/../assets/images/banner.png';

/**
 * End of Customization **********
 */

const makebanner = {
  /**
   * Generate a PNG banner
   *
   * @param username
   * @returns {Promise<*>}
   */
  generate: async function(username) {
    try {
      logger.log("Generating banner PNG", username);

      const banner = gd.createFromPng(blankBanner);
      banner.alphaBlending(1);
      banner.saveAlpha(1);

      const color = banner.colorAllocate.apply(banner, textColor);

      const outputPath = __dirname + '/../assets/banners/banner-' + username.replace(/[^a-zA-Z0-9]/g, '-') + '.png';
      username = "@" + username;

      // As we will be right-aligning the nickname, we need to find out the total width of the text
      const usernameStringData = banner.stringFTBBox(color, sourceFont, textSize, 0, 0, textPositionY, username);
      const usernameTextWidth = Math.abs(usernameStringData[0] - usernameStringData[2]);

      // We will calculate the X position of the text, not taking into consideration the letter spacing that will be
      // added later on. We want the text to end at usernameBarWidth, so we need to substract that width to the width
      // of the text and start writing from there.
      const usernameTextPositionX = Math.round(usernameBarWidth - usernameTextWidth);

      // Generate the text with letter spacing and adjust its X position if needed.
      makebanner.stringFtSp(
        banner, color, sourceFont, textSize, textAngle, usernameTextPositionX, textPositionY, username,
        textLetterSpacing, true
      );

      // Export the PNG file
      banner.savePng(outputPath);
      banner.destroy();

      return outputPath;
    } catch(err) {
      console.error("[error][makebanner_generate]", err);
      return false;
    }
  },

  /**
   * Write a text with letter spacing
   *
   * @param image
   * @param color
   * @param font
   * @param fontSize
   * @param angle
   * @param x
   * @param y
   * @param text
   * @param spacing
   * @param adjustX
   */
  stringFtSp: function(image, color, font, fontSize, angle, x, y, text, spacing, adjustX) {
    if (typeof spacing === "undefined") {
      image.stringFT(color, font, fontSize, angle, x, y, text);
    } else {

      // Adjusting x based on the number of space to insert
      // Useful for when you text is right positioned
      if (typeof adjustX !== "undefined" && adjustX === true) {
        const nbSpaces = text.length - 1;
        x = x - (nbSpaces * spacing);
      }

      // Write the text letter by letter and add the spaces
      let tempX = x;
      for (let i=0; i<text.length; i++) {
        const letter = text[i];
        const bbox = image.stringFTBBox(color, font, fontSize, angle, tempX, y, letter);

        image.stringFT(color, font, fontSize, angle, tempX, y, letter);
        tempX += spacing + (bbox[2] - bbox[0]);
      }
    }
  }
};

module.exports = makebanner;