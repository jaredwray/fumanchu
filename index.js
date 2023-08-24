const HandlebarsLib = require('handlebars');
const helpers = require('./helpers.js');

const handlebars = HandlebarsLib.create();
helpers({ handlebars: handlebars });

module.exports = handlebars;
