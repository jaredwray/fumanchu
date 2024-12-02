import * as HandlebarsLib from 'handlebars';
import { HelperRegistry, HelperFilter } from './helper-registry.js';
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
  const registry = new HelperRegistry();
  const handlebars = HandlebarsLib.create();
  const helpersFunction = await import('../helpers/helpers.js');
  helpersFunction.default({ handlebars: handlebars });
  registry.swapHelpers(handlebars);
  return handlebars;
}

/**
 * @typedef {Object} FumanchuCachingOptions
 * @property {number|string} [ttl] - Time to Live - If you set a number it is miliseconds, if you set a string it is a human-readable
 * format such as `1s` for 1 second or `1h` for 1 hour. Setting undefined means that it will use the default time-to-live. If both are
 * undefined then it will not have a time-to-live.
 * @property {boolean} [useClone] - If true, it will clone the value before returning it. If false, it will return the value directly. Default is true.
 * @property {number} [lruSize] - The size of the LRU cache. If set to 0, it will not use LRU cache. Default is 0.
 * @property {number} [checkInterval] - The interval to check for expired items. If set to 0, it will not check for expired items. Default is 0.
 */
export type FumanchuCachingOptions = {
	ttl?: number | string;
	useClone?: boolean;
	lruSize?: number;
	checkInterval?: number;
};

export type FumanchuOptions = {
  handlebars?: typeof HandlebarsLib;
  helpers?: Record<string, Function>;
  name?: string | string[];
  include?: HelperFilter[];
  exclude?: HelperFilter[];
  caching?: boolean | FumanchuCachingOptions;
};

/**
 * Will return a Handlebars instance with Fumanchu helpers (experimental)
 * @returns {Handlebars} Handlebars instance with helpers
 */
export function fumanchu(options?: FumanchuOptions) {
  const registry = new HelperRegistry();
  const handlebars = HandlebarsLib.create();
  registry.loadHandlebars(handlebars);
  return handlebars;
}

export { HelperRegistry, HelperFilter };