// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import {
	type Helper,
	type HelperFilter,
	HelperRegistryBase,
	HelperRegistryCompatibility,
} from "./helper-registry-base.js";
import { helpers as arrayHelpers } from "./helpers/array.js";
import { helpers as codeHelpers } from "./helpers/code.js";
import { helpers as codeNodeHelpers } from "./helpers/code.node.js";
import { helpers as collectionHelpers } from "./helpers/collection.js";
import { helpers as comparisonHelpers } from "./helpers/comparison.js";
import { helpers as dateHelpers } from "./helpers/date.js";
import { helpers as fsHelpers } from "./helpers/fs.js";
import { helpers as htmlHelpers } from "./helpers/html.js";
import { helpers as htmlNodeHelpers } from "./helpers/html.node.js";
import { helpers as i18nHelpers } from "./helpers/i18n.js";
import { helpers as inflectionHelpers } from "./helpers/inflection.js";
import { helpers as loggingHelpers } from "./helpers/logging.js";
import { helpers as matchHelpers } from "./helpers/match.js";
import { helpers as mathHelpers } from "./helpers/math.js";
import { helpers as mdHelpers } from "./helpers/md.node.js";
import { helpers as miscHelpers } from "./helpers/misc.js";
import { helpers as numberHelpers } from "./helpers/number.js";
import { helpers as objectHelpers } from "./helpers/object.js";
import { helpers as pathHelpers } from "./helpers/path.js";
import { helpers as regexHelpers } from "./helpers/regex.js";
import { helpers as stringHelpers } from "./helpers/string.js";
import { helpers as urlHelpers } from "./helpers/url.js";
import { helpers as urlNodeHelpers } from "./helpers/url.node.js";

export {
	type Helper,
	type HelperFilter,
	HelperRegistryBase,
	HelperRegistryCompatibility,
};

export class HelperRegistry extends HelperRegistryBase {
	public init() {
		// Array
		this.registerHelpers(arrayHelpers);
		// Collection
		this.registerHelpers(collectionHelpers);
		// Date
		this.registerHelpers(dateHelpers);
		// File System
		this.registerHelpers(fsHelpers);
		// Code (browser-safe: gist, jsfiddle; node-only: embed)
		this.registerHelpers(codeHelpers);
		this.registerHelpers(codeNodeHelpers);
		// Markdown
		this.registerHelpers(mdHelpers);
		// Html (browser-safe: attr, sanitize, ul, ol, thumbnailImage; node-only: css, js)
		this.registerHelpers(htmlHelpers);
		this.registerHelpers(htmlNodeHelpers);
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
		// Url (browser-safe + node-only)
		this.registerHelpers(urlHelpers);
		this.registerHelpers(urlNodeHelpers);
		// Object
		this.registerHelpers(objectHelpers);
	}
}
