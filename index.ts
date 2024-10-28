import * as HandlebarsLib from 'handlebars';
import helpersLib from './helpers.js';

/**
 * Fumanchu Handlebars instance
 * @type {Handlebars}
 */
export const handlebars = HandlebarsLib.create();
/**
 * Fumanchu Handlebars helpers
 */
export const helpers = helpersLib;

/**
 * Create a new Handlebars instance with Fumanchu helpers
 * @returns {Promise<Handlebars>}
 */
export async function createHandlebars() {
  const handlebars = HandlebarsLib.create();
  const helpersFunction = await import('./helpers.js');
  helpersFunction.default({ handlebars: handlebars });
  return handlebars;
}