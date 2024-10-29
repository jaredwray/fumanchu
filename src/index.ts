import * as HandlebarsLib from 'handlebars';
import { HelperRegistry } from './helper-registry.js';
import helpersLib from '../helpers/helpers.js';

/**
 * Handlebars library not initiated with helpers
 * @type {Handlebars}
 */
export const Handlebars = HandlebarsLib;

/**
 * Fumanchu Handlebars instance not initiated with helpers
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
  const helpersFunction = await import('../helpers/helpers.js');
  helpersFunction.default({ handlebars: handlebars });
  return handlebars;
}

export function fumanchu() {
  const registry = new HelperRegistry();
  const handlebars = HandlebarsLib.create();
  registry.loadHandlebars(handlebars);
  return handlebars;
}