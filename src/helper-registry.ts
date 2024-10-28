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
    compatibility: HelperRegistryCompatibility;
    helper: Function;
}

export class HelperRegistry {
    private _helpers: Array<Helper> = [];

    public register(helper: Helper) {
        if(!this.has(helper.name, helper.category)) {
            this._helpers.push(helper);
        }
    }

    public has(name: string, category: string): boolean {
        return this._helpers.some(helper => helper.name === name && helper.category === category);
    }

    public filter(filter: HelperFilter): Array<Helper> {
        return this._helpers.filter(helper => {
            return (!filter.name || helper.name === filter.name) &&
                (!filter.category || helper.category === filter.category) &&
                (!filter.compatibility || helper.compatibility === filter.compatibility);
        });
    }
}