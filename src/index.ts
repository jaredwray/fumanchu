import * as HandlebarsLib from "handlebars";
import { HelperFilter, HelperRegistry } from "./helper-registry.js";

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
export type HelpersOptions = {
	handlebars?: typeof HandlebarsLib;
	hbs?: typeof HandlebarsLib;
};

/**
 * Register Handlebars helpers
 * @param {HelpersOptions} options - Options for Fumanchu helpers
 */
export function helpers(options: HelpersOptions) {
	const registry = new HelperRegistry();
	registry.loadHandlebars(options.handlebars ?? options.hbs);
}

/**
 * Create a new Handlebars instance with Fumanchu helpers
 * @returns {Promise<Handlebars>}
 * @deprecated Will be deprecated in future versions, use `fumanchu` instead.
 */
export async function createHandlebars() {
	const registry = new HelperRegistry();
	const handlebars = HandlebarsLib.create();
	registry.loadHandlebars(handlebars);

	if (process.env.NODE_ENV === "development") {
		console.warn(
			"createHandlebars will be deprecated in future versions, use `fumanchu` instead.",
		);
	}

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
	filter?: HelperFilter;
	caching?: boolean | FumanchuCachingOptions;
};

/**
 * Will return a Handlebars instance with Fumanchu helpers (experimental)
 * @param {FumanchuOptions} [options] - Options for Fumanchu
 * @returns {Handlebars} Handlebars instance with helpers
 */
export function fumanchu(options?: FumanchuOptions) {
	const registry = new HelperRegistry();
	let handlebars = HandlebarsLib.create();
	if (options?.handlebars) {
		handlebars = options.handlebars;
	}
	registry.loadHandlebars(handlebars);
	return handlebars;
}

export { HelperRegistry, HelperFilter };
