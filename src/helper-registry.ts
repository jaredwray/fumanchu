// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import type Handlebars from "handlebars";
import { helpers as arrayHelpers } from "./helpers/array.js";
import { helpers as codeHelpers } from "./helpers/code.js";
import { helpers as collectionHelpers } from "./helpers/collection.js";
import { helpers as comparisonHelpers } from "./helpers/comparison.js";
import { helpers as dateHelpers } from "./helpers/date.js";
import { helpers as fsHelpers } from "./helpers/fs.js";
import { helpers as mdHelpers } from "./helpers/md.js";

export enum HelperRegistryCompatibility {
	NODEJS = "nodejs",
	BROWSER = "browser",
}

export type HelperFilter = {
	name?: string;
	category?: string;
	compatibility?: HelperRegistryCompatibility;
};

export type Helper = {
	name: string;
	category: string;
	compatibility?: HelperRegistryCompatibility;
	fn:
		| ((...arguments_: any[]) => string)
		| ((...arguments_: any[]) => Handlebars.SafeString);
};

export class HelperRegistry {
	private readonly _helpers: Helper[] = [];

	constructor() {
		this.init();
	}

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
		// Comparison
		this.registerHelpers(comparisonHelpers);
	}

	public register(helper: Helper): boolean {
		const result = false;
		if (!this.has(helper.name)) {
			this._helpers.push(helper);
		}

		return result;
	}

	public registerHelpers(helpers: Helper[]) {
		for (const helper of helpers) {
			this.register(helper);
		}
	}

	public has(name: string): boolean {
		return this._helpers.some((helper) => helper.name === name);
	}

	public filter(filter: HelperFilter): Helper[] {
		/* c8 ignore next 4 */
		return this._helpers.filter(
			(helper) =>
				(!filter.name || helper.name === filter.name) &&
				(!filter.category || helper.category === filter.category) &&
				(!filter.compatibility ||
					helper.compatibility === filter.compatibility),
		);
	}

	public loadHandlebars(handlebars: any) {
		for (const helper of this._helpers) {
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}

	public swapHelpers(handlebars: any) {
		for (const helper of this._helpers) {
			handlebars.unregisterHelper(helper.name);
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}
}
