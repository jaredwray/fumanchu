import HandlebarsLib from 'handlebars';

const handlebars = HandlebarsLib.create();

import('./helpers.js').then((module) => {
    const helpers = module.default;
    helpers({ handlebars: handlebars });
    });

// Exporting for ESM
export default handlebars;
