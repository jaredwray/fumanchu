import type { Helper } from "../helper-registry.js";
import { helpers as arrayHelpers } from "./array.js";
import { helpers as codeHelpers } from "./code.js";
import { helpers as collectionHelpers } from "./collection.js";
import { helpers as comparisonHelpers } from "./comparison.js";
import { helpers as dateHelpers } from "./date.js";
import { helpers as fsHelpers } from "./fs.js";
import { helpers as htmlHelpers } from "./html.js";
import { helpers as i18nHelpers } from "./i18n.js";
import { helpers as inflectionHelpers } from "./inflection.js";
import { helpers as loggingHelpers } from "./logging.js";
import { helpers as matchHelpers } from "./match.js";
import { helpers as mathHelpers } from "./math.js";
import { helpers as mdHelpers } from "./md.js";
import { helpers as miscHelpers } from "./misc.js";
import { helpers as numberHelpers } from "./number.js";
import { helpers as objectHelpers } from "./object.js";
import { helpers as pathHelpers } from "./path.js";
import { helpers as regexHelpers } from "./regex.js";
import { helpers as stringHelpers } from "./string.js";
import { helpers as urlHelpers } from "./url.js";

/**
 * Enum representing the runtime compatibility for helpers.
 * Use this to filter helpers based on their compatibility.
 */
export enum HelperEnvironment {
	/**
	 * All helpers regardless of environment compatibility.
	 */
	ALL = "all",
	/**
	 * Helpers compatible with Node.js runtime.
	 * Includes helpers that require Node.js APIs (fs, path, etc.).
	 */
	NODEJS = "nodejs",
	/**
	 * Helpers compatible with browser environments.
	 * Excludes helpers that require Node.js-specific APIs.
	 */
	BROWSER = "browser",
}

/**
 * Get all helpers from all categories.
 * @returns {Helper[]} Array of all registered helpers.
 */
const getAllHelpers = (): Helper[] => {
	return [
		...arrayHelpers,
		...codeHelpers,
		...collectionHelpers,
		...comparisonHelpers,
		...dateHelpers,
		...fsHelpers,
		...htmlHelpers,
		...i18nHelpers,
		...inflectionHelpers,
		...loggingHelpers,
		...matchHelpers,
		...mathHelpers,
		...mdHelpers,
		...miscHelpers,
		...numberHelpers,
		...objectHelpers,
		...pathHelpers,
		...regexHelpers,
		...stringHelpers,
		...urlHelpers,
	];
};

/**
 * Get helpers filtered by environment compatibility.
 * @param {HelperEnvironment} environment - The target environment.
 * @returns {Helper[]} Array of helpers compatible with the specified environment.
 */
export const getHelpersByEnvironment = (
	environment: HelperEnvironment,
): Helper[] => {
	const allHelpers = getAllHelpers();

	if (environment === HelperEnvironment.ALL) {
		return allHelpers;
	}

	return allHelpers.filter((helper) => {
		// If no compatibility specified, assume it works in all environments
		/* c8 ignore next 3 -- @preserve: no helpers without compatibility exist currently */
		if (!helper.compatibility || helper.compatibility.length === 0) {
			return true;
		}
		return helper.compatibility.includes(environment);
	});
};

/**
 * Get helper names filtered by environment compatibility.
 * @param {HelperEnvironment} environment - The target environment.
 * @returns {string[]} Array of helper names compatible with the specified environment.
 */
export const getHelperNamesByEnvironment = (
	environment: HelperEnvironment,
): string[] => {
	return getHelpersByEnvironment(environment).map((helper) => helper.name);
};

/**
 * Get all helper names.
 * @returns {string[]} Array of all helper names.
 */
export const getAllHelperNames = (): string[] => {
	return getHelperNamesByEnvironment(HelperEnvironment.ALL);
};

/**
 * Get Node.js-only helper names (helpers that ONLY work in Node.js).
 * @returns {string[]} Array of Node.js-only helper names.
 */
export const getNodejsOnlyHelperNames = (): string[] => {
	const allHelpers = getAllHelpers();
	return allHelpers
		.filter((helper) => {
			/* c8 ignore next 3 -- @preserve: no helpers without compatibility exist currently */
			if (!helper.compatibility || helper.compatibility.length === 0) {
				return false;
			}
			return (
				helper.compatibility.includes(HelperEnvironment.NODEJS) &&
				!helper.compatibility.includes(HelperEnvironment.BROWSER)
			);
		})
		.map((helper) => helper.name);
};

/**
 * Get browser-only helper names (helpers that ONLY work in the browser).
 * @returns {string[]} Array of browser-only helper names.
 */
/* c8 ignore start -- @preserve: no browser-only helpers exist currently */
export const getBrowserOnlyHelperNames = (): string[] => {
	const allHelpers = getAllHelpers();
	return allHelpers
		.filter((helper) => {
			if (!helper.compatibility || helper.compatibility.length === 0) {
				return false;
			}
			return (
				helper.compatibility.includes(HelperEnvironment.BROWSER) &&
				!helper.compatibility.includes(HelperEnvironment.NODEJS)
			);
		})
		.map((helper) => helper.name);
};
/* c8 ignore stop */

/**
 * Get universal helper names (helpers that work in both Node.js and browser).
 * @returns {string[]} Array of universal helper names.
 */
export const getUniversalHelperNames = (): string[] => {
	const allHelpers = getAllHelpers();
	return allHelpers
		.filter((helper) => {
			// No compatibility means universal
			/* c8 ignore next 3 -- @preserve: no helpers without compatibility exist currently */
			if (!helper.compatibility || helper.compatibility.length === 0) {
				return true;
			}
			return (
				helper.compatibility.includes(HelperEnvironment.NODEJS) &&
				helper.compatibility.includes(HelperEnvironment.BROWSER)
			);
		})
		.map((helper) => helper.name);
};

/**
 * Check if a helper is compatible with a specific environment.
 * @param {string} helperName - The name of the helper to check.
 * @param {HelperEnvironment} environment - The target environment.
 * @returns {boolean} True if the helper is compatible with the environment.
 */
export const isHelperCompatible = (
	helperName: string,
	environment: HelperEnvironment,
): boolean => {
	const allHelpers = getAllHelpers();
	const helper = allHelpers.find((h) => h.name === helperName);

	if (!helper) {
		return false;
	}

	if (environment === HelperEnvironment.ALL) {
		return true;
	}

	// If no compatibility specified, assume it works in all environments
	/* c8 ignore next 3 -- @preserve: no helpers without compatibility exist currently */
	if (!helper.compatibility || helper.compatibility.length === 0) {
		return true;
	}

	return helper.compatibility.includes(environment);
};

/**
 * Get the count of helpers by environment.
 * @param {HelperEnvironment} environment - The target environment.
 * @returns {number} The number of helpers compatible with the environment.
 */
export const getHelperCountByEnvironment = (
	environment: HelperEnvironment,
): number => {
	return getHelpersByEnvironment(environment).length;
};

/**
 * Get a summary of helper counts by environment.
 * @returns {{ all: number; nodejs: number; browser: number; nodejsOnly: number; browserOnly: number; universal: number }} Object with helper counts.
 */
export const getHelperEnvironmentSummary = (): {
	all: number;
	nodejs: number;
	browser: number;
	nodejsOnly: number;
	browserOnly: number;
	universal: number;
} => {
	return {
		all: getHelperCountByEnvironment(HelperEnvironment.ALL),
		nodejs: getHelperCountByEnvironment(HelperEnvironment.NODEJS),
		browser: getHelperCountByEnvironment(HelperEnvironment.BROWSER),
		nodejsOnly: getNodejsOnlyHelperNames().length,
		browserOnly: getBrowserOnlyHelperNames().length,
		universal: getUniversalHelperNames().length,
	};
};

export { getAllHelpers };
