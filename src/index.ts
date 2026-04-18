import {
	CacheableMemory,
	type CacheableMemoryOptions,
} from "@cacheable/memory";
import HandlebarsLib from "handlebars";
import { type HelperFilter, HelperRegistry } from "./helper-registry.js";

type HbsCompileFn = typeof HandlebarsLib.compile;
type HbsCompileOptions = Parameters<HbsCompileFn>[1];
type HbsCompiledTemplate = ReturnType<HbsCompileFn>;

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
	registry.load(options.handlebars ?? options.hbs);
}

/**
 * Create a new Handlebars instance with Fumanchu helpers
 * @returns {Promise<Handlebars>}
 * @deprecated Will be deprecated in future versions, use `fumanchu()` instead.
 */
export async function createHandlebars() {
	const registry = new HelperRegistry();
	const handlebars = HandlebarsLib.create();
	if (Object.keys(HandlebarsLib.partials).length > 0) {
		handlebars.registerPartial(HandlebarsLib.partials);
	}
	registry.load(handlebars);
	/* c8 ignore next -- @preserve */
	if (process.env.NODE_ENV === "development") {
		console.warn(
			"createHandlebars will be deprecated in future versions, use `fumanchu` instead.",
		);
	}

	return handlebars;
}

export type FumanchuOptions = {
	handlebars?: typeof HandlebarsLib;
	filter?: HelperFilter;
	caching?: boolean | CacheableMemory | CacheableMemoryOptions;
};

/**
 * Will return a Handlebars instance with Fumanchu helpers (experimental)
 * @param {FumanchuOptions} [options] - Options for Fumanchu
 * @returns {Handlebars} Handlebars instance with helpers
 */
export function fumanchu(options?: FumanchuOptions) {
	const registry = new HelperRegistry();
	let handlebars = HandlebarsLib.create();
	/* c8 ignore next -- @preserve */
	if (options?.handlebars) {
		handlebars = options.handlebars;
	} else if (Object.keys(HandlebarsLib.partials).length > 0) {
		handlebars.registerPartial(HandlebarsLib.partials);
	}
	registry.load(handlebars);

	if (options?.caching) {
		let cache: CacheableMemory;
		if (options.caching instanceof CacheableMemory) {
			cache = options.caching;
		} else if (typeof options.caching === "object") {
			cache = new CacheableMemory({
				useClone: false,
				...options.caching,
			});
		} else {
			cache = new CacheableMemory({ useClone: false });
		}

		const originalCompile = handlebars.compile.bind(handlebars);
		handlebars.compile = (
			input: string,
			compileOptions?: HbsCompileOptions,
		) => {
			const key = compileOptions
				? `${input}\0${JSON.stringify(compileOptions)}`
				: input;
			const cached = cache.get<HbsCompiledTemplate>(key);
			if (cached) {
				return cached;
			}

			const compiled = originalCompile(input, compileOptions);
			cache.set(key, compiled);
			return compiled;
		};
	}

	return handlebars;
}

export {
	CacheableMemory,
	type CacheableMemoryOptions,
	type HelperFilter,
	HelperRegistry,
};
