// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars

export enum HelperRegistryCompatibility {
	NODEJS = "nodejs",
	BROWSER = "browser",
}

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
		| ((...arguments_: any[]) => any);
};

export type HelperFilter = {
	names?: string[];
	categories?: string[];
	compatibility?: string[];
};

/**
 * Base class for helper registries. Holds all state-management logic and
 * leaves `init()` empty so environment-specific subclasses decide which
 * helper sets to register. This lets the browser registry avoid importing
 * any Node-only helper files.
 */
export class HelperRegistryBase {
	protected readonly _helpers: Helper[] = [];

	constructor() {
		this.init();
	}

	/**
	 * Get all registered helpers.
	 */
	public get helpers(): Helper[] {
		return this._helpers;
	}

	/**
	 * Initialize the helper registry. Overridden by subclasses.
	 */
	public init(): void {
		// Intentionally empty; subclasses register helpers here.
	}

	/**
	 * Register a helper.
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
	 */
	public registerHelpers(helpers: Helper[]) {
		for (const helper of helpers) {
			this.register(helper);
		}
	}

	/**
	 * Check if a helper is registered.
	 */
	public has(name: string): boolean {
		return this._helpers.some((helper) => helper.name === name);
	}

	/**
	 * Filter helpers by the given criteria.
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
	 * Swap Handlebars helpers. This is used when you want to swap out legacy
	 * helpers for fumanchu helpers.
	 */
	public swap(handlebars: any) {
		for (const helper of this._helpers) {
			handlebars.unregisterHelper(helper.name);
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}
}
