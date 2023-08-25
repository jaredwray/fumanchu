// index.d.ts

// Importing types from the handlebars package
import { Handlebars } from 'handlebars';

// Assuming helpers.js exports a function. Adjust as needed.
interface HelpersFunction {
    (config: { handlebars: typeof Handlebars }): void;
}

// Since you're exporting the handlebars instance itself:
declare const handlebars: typeof Handlebars;

export = handlebars;


