// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import {
	type Helper,
	type HelperFilter,
	HelperRegistryBase,
	HelperRegistryCompatibility,
} from "./helper-registry-base.js";
import { helpers as arrayHelpers } from "./helpers/array.js";
import { helpers as codeHelpers } from "./helpers/code.js";
import { helpers as collectionHelpers } from "./helpers/collection.js";
import { helpers as comparisonHelpers } from "./helpers/comparison.js";
import { helpers as dateHelpers } from "./helpers/date.js";
import { helpers as htmlHelpers } from "./helpers/html.js";
import { helpers as i18nHelpers } from "./helpers/i18n.js";
import { helpers as inflectionHelpers } from "./helpers/inflection.js";
import { helpers as matchHelpers } from "./helpers/match.js";
import { helpers as mathHelpers } from "./helpers/math.js";
import { helpers as miscHelpers } from "./helpers/misc.js";
import { helpers as numberHelpers } from "./helpers/number.js";
import { helpers as objectHelpers } from "./helpers/object.js";
import { helpers as regexHelpers } from "./helpers/regex.js";
import { helpers as stringHelpers } from "./helpers/string.js";
import { helpers as urlHelpers } from "./helpers/url.js";

export {
	type Helper,
	type HelperFilter,
	HelperRegistryBase,
	HelperRegistryCompatibility,
};

/**
 * Browser-only helper registry. Registers every environment-neutral helper
 * and omits anything that depends on Node core modules (fs, path, logging,
 * markdown, node-only url/html/code helpers).
 */
export class HelperRegistryBrowser extends HelperRegistryBase {
	public init() {
		this.registerHelpers(arrayHelpers);
		this.registerHelpers(collectionHelpers);
		this.registerHelpers(dateHelpers);
		this.registerHelpers(codeHelpers);
		this.registerHelpers(htmlHelpers);
		this.registerHelpers(comparisonHelpers);
		this.registerHelpers(i18nHelpers);
		this.registerHelpers(inflectionHelpers);
		this.registerHelpers(matchHelpers);
		this.registerHelpers(mathHelpers);
		this.registerHelpers(miscHelpers);
		this.registerHelpers(numberHelpers);
		this.registerHelpers(regexHelpers);
		this.registerHelpers(stringHelpers);
		this.registerHelpers(urlHelpers);
		this.registerHelpers(objectHelpers);
	}
}
