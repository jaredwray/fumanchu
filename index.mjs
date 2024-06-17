import HandlebarsLib from 'handlebars';

const handlebars = HandlebarsLib.create();

// Variable to hold the helpers function
let handlebarHelpers;

import('./helpers.js').then((module) => {
    handlebarHelpers = module.default;
    handlebarHelpers({ handlebars: handlebars });
});

// Exporting for ESM
export default handlebars;
export { handlebarHelpers };

