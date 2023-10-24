const HandlebarsLib = require('handlebars');
const helpers = require('./helpers.js');

const handlebars = HandlebarsLib.create();
helpers({ handlebars: handlebars });

module.exports = handlebars;
module.exports.handlebars = HandlebarsLib;
module.exports.handlebarHelpers = helpers;
module.exports.helpers = helpers;
