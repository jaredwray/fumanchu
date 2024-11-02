import {helpers as dateHelpers} from './helpers/date.js';

export enum HelperRegistryCompatibility {
	NODEJS = 'nodejs',
	BROWSER = 'browser',
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
	fn: ((...arguments_: any[]) => string);
};

export class HelperRegistry {
	private readonly _helpers: Helper[] = [];

	constructor() {
		this.init();
	}

	public init() {
		// Date
		this.registerHelpers(dateHelpers);
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
		return this._helpers.some(helper => helper.name === name);
	}

	public filter(filter: HelperFilter): Helper[] {
		/* c8 ignore next 4 */
		return this._helpers.filter(helper => (!filter.name || helper.name === filter.name)
				&& (!filter.category || helper.category === filter.category)
				&& (!filter.compatibility || helper.compatibility === filter.compatibility));
	}

	public loadHandlebars(handlebars: any) {
		for (const helper of this._helpers) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}

	public swapHelpers(handlebars: any) {
		for (const helper of this._helpers) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			handlebars.unregisterHelper(helper.name);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}
}
