import { helpers as dateHelpers } from './helpers/date.js';

export enum HelperRegistryCompatibility {
	NODEJS = 'nodejs',
	BROWSER = 'browser',
}

export type HelperFilter = {
	name?: string;
	category?: string;
	compatibility?: HelperRegistryCompatibility;
}

export type Helper = {
	name: string;
	category: string;
	compatibility?: HelperRegistryCompatibility;
	fn: Function;
}

export class HelperRegistry {
	private _helpers: Array<Helper> = [];

	constructor() {
		this.init();
	}

	public init() {
		// Date
		this.registerHelpers(dateHelpers);
	}

	public register(helper: Helper) {
		if (this.has(helper.name)) {
			throw new Error(`Helper ${helper.name} already exists.`);
		}
		this._helpers.push(helper);
	}

	public registerHelpers(helpers: Array<Helper>) {
		helpers.forEach(helper => this.register(helper));
	}

	public has(name: string): boolean {
		return this._helpers.some(helper => helper.name === name);
	}

	public filter(filter: HelperFilter): Array<Helper> {
		return this._helpers.filter(helper => {
			return (!filter.name || helper.name === filter.name) &&
				(!filter.category || helper.category === filter.category) &&
				(!filter.compatibility || helper.compatibility === filter.compatibility);
		});
	}

	public loadHandlebars(handlebars: any) {
		this._helpers.forEach(helper => {
			console.log(helper);
			handlebars.registerHelper(helper.name, helper.fn);
		});
	}
}