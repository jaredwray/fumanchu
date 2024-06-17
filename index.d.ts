// Import necessary types from the Handlebars library
import { HelperDelegate, HandlebarsLib as HandlebarsNamespace } from 'handlebars';

// Define a type for the Handlebars instance
export interface HandlebarsInstance extends HandlebarsNamespace {
  create: () => HandlebarsInstance;
  registerHelper: (name: string, fn: HelperDelegate) => void;
}

// Define the type for the parameters of the helpers function
interface HelpersParams {
  handlebars: HandlebarsInstance;
}

// Define the type for the helpers function
declare function helpers(params: HelpersParams): void;

// Declare the variable to hold the helpers function, which may be undefined initially
declare let handlebarHelpers: typeof helpers | undefined;

// Declare the Handlebars instance as a HandlebarsInstance and export it as the default export
declare const handlebars: HandlebarsInstance;
export default handlebars;

// Export the helpers function as a named export
export { handlebarHelpers };
