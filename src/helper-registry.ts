// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import type Handlebars from "handlebars";
import { helpers as arrayHelpers } from "./helpers/array.js";
import { helpers as codeHelpers } from "./helpers/code.js";
import { helpers as collectionHelpers } from "./helpers/collection.js";
import { helpers as comparisonHelpers } from "./helpers/comparison.js";
import { helpers as dateHelpers } from "./helpers/date.js";
import { helpers as fsHelpers } from "./helpers/fs.js";
import { helpers as htmlHelpers } from "./helpers/html.js";
import { helpers as i18nHelpers } from "./helpers/i18n.js";
import { helpers as inflectionHelpers } from "./helpers/inflection.js";
import { helpers as loggingHelpers } from "./helpers/logging.js";
import { helpers as matchHelpers } from "./helpers/match.js";
import { helpers as mathHelpers } from "./helpers/math.js";
import { helpers as mdHelpers } from "./helpers/md.js";
import { helpers as miscHelpers } from "./helpers/misc.js";
import { helpers as numberHelpers } from "./helpers/number.js";
import { helpers as objectHelpers } from "./helpers/object.js";
import { helpers as pathHelpers } from "./helpers/path.js";
import { helpers as regexHelpers } from "./helpers/regex.js";
import { helpers as stringHelpers } from "./helpers/string.js";
import { helpers as urlHelpers } from "./helpers/url.js";

export enum HelperRegistryCompatibility {
	NODEJS = "nodejs",
	BROWSER = "browser",
}

export {
	getAllHelperNames,
	getAllHelpers,
	getBrowserOnlyHelperNames,
	getHelperCountByEnvironment,
	getHelperEnvironmentSummary,
	getHelperNamesByEnvironment,
	getHelpersByEnvironment,
	getNodejsOnlyHelperNames,
	getUniversalHelperNames,
	HelperEnvironment,
	isHelperCompatible,
} from "./helpers/environment.js";

export type Helper = {
	name: string;
	category: string;
	compatibility?: string[];
	fn:
		| ((...arguments_: any[]) => string)
		| ((...arguments_: any[]) => number)
		| ((...arguments_: any[]) => boolean)
		| ((...arguments_: any[]) => unknown)
		| ((...arguments_: any[]) => number | string)
		| ((...arguments_: any[]) => Handlebars.SafeString);
};

export type HelperFilter = {
	names?: string[];
	categories?: string[];
	compatibility?: string[];
};

export class HelperRegistry {
	private readonly _helpers: Helper[] = [];

	constructor() {
		this.init();
	}

	/**
	 * Get all registered helpers.
	 * @returns {Helper[]} The array of registered helpers.
	 */
	public get helpers(): Helper[] {
		return this._helpers;
	}

	/**
	 * Initialize the helper registry. This is performed during the construction of the registry such as new HelperRegistry().
	 */
	public init() {
		// Array
		this.registerHelpers(arrayHelpers);
		// Collection
		this.registerHelpers(collectionHelpers);
		// Date
		this.registerHelpers(dateHelpers);
		// File System
		this.registerHelpers(fsHelpers);
		// Code
		this.registerHelpers(codeHelpers);
		// Markdown
		this.registerHelpers(mdHelpers);
		// Html
		this.registerHelpers(htmlHelpers);
		// Comparison
		this.registerHelpers(comparisonHelpers);
		// i18n
		this.registerHelpers(i18nHelpers);
		// Inflection
		this.registerHelpers(inflectionHelpers);
		// Logging
		this.registerHelpers(loggingHelpers);
		// Match
		this.registerHelpers(matchHelpers);
		// Math
		this.registerHelpers(mathHelpers);
		// Misc
		this.registerHelpers(miscHelpers);
		// Number
		this.registerHelpers(numberHelpers);
		// Path
		this.registerHelpers(pathHelpers);
		// Regex
		this.registerHelpers(regexHelpers);
		// String
		this.registerHelpers(stringHelpers);
		// Url
		this.registerHelpers(urlHelpers);
		// Object
		this.registerHelpers(objectHelpers);
	}

	/**
	 * Register a helper.
	 * @param {Helper} helper The helper to register.
	 * @returns True if the helper was registered, false otherwise.
	 */
	public register(helper: Helper): boolean {
		const result = false;
		if (!this.has(helper.name)) {
			this._helpers.push(helper);
		}

		return result;
	}

	/**
	 * Register multiple helpers.
	 * @param {Helper[]} helpers The array of helpers to register.
	 */
	public registerHelpers(helpers: Helper[]) {
		for (const helper of helpers) {
			this.register(helper);
		}
	}

	/**
	 * Check if a helper is registered.
	 * @param name The name of the helper.
	 * @returns True if the helper is registered, false otherwise.
	 */
	public has(name: string): boolean {
		return this._helpers.some((helper) => helper.name === name);
	}

	/**
	 * Filter helpers by the given criteria.
	 * @param filter The filter criteria.
	 * @returns The filtered helpers.
	 */
	public filter(filter: HelperFilter): Helper[] {
		let result = this._helpers;
		if (filter.names) {
			result = result.filter((helper) => filter.names?.includes(helper.name));
		}
		if (filter.categories) {
			result = result.filter((helper) =>
				filter.categories?.includes(helper.category),
			);
		}
		if (filter.compatibility) {
			result = result.filter((helper) =>
				helper.compatibility?.some((c) => filter.compatibility?.includes(c)),
			);
		}
		return result;
	}

	/**
	 * Load Handlebars helpers.
	 * @param {Handlebars} handlebars The Handlebars instance.
	 * @returns {void}
	 */
	public load(handlebars: any, filters?: HelperFilter) {
		let helpers = this._helpers;

		if (filters) {
			helpers = this.filter(filters);
		}

		for (const helper of helpers) {
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}

	/**
	 * Swap Handlebars helpers. This is used when you want to swap out legacy helpers for fumanchu helpers.
	 * @param handlebars The Handlebars instance.
	 * @returns {void}
	 */
	public swap(handlebars: any) {
		for (const helper of this._helpers) {
			handlebars.unregisterHelper(helper.name);
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}
}
