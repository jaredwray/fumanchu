const HandlebarsLib = require('handlebars');
const helpers = require('./helpers.js');

const Handlebars = HandlebarsLib.create();

function Fumanchu() {
    helpers({ handlebars: Handlebars });
    return Handlebars;
}

module.exports = Fumanchu;
