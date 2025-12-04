/**
 * Native implementation to replace get-value module
 * Safely gets nested object properties using dot notation or array paths
 * @param object - The object to traverse
 * @param path - Dot notation string or array of keys
 * @returns The value at the path or undefined if not found
 */
// biome-ignore lint/suspicious/noExplicitAny: handlebars helpers use any for context
export const get = (object: any, path: string | string[]): any => {
	if (!object || typeof object !== "object") return undefined;

	const keys = Array.isArray(path) ? path : path.split(".");
	let result = object;

	for (const key of keys) {
		if (result == null || typeof result !== "object") return undefined;
		result = result[key];
	}

	return result;
};

/**
 * Native implementation to replace get-object module
 * Returns an object containing the key-value pair at the specified path
 * @param object - The object to traverse
 * @param path - Dot notation string or array of keys
 * @returns An object containing the key-value pair, or undefined if not found
 */
// biome-ignore lint/suspicious/noExplicitAny: handlebars helpers use any for context
export const getObject = (object: any, path: string | string[]): any => {
	if (!object || typeof object !== "object") return undefined;

	const keys = Array.isArray(path) ? path : path.split(".");
	if (keys.length === 0) return undefined;

	let current = object;

	// Navigate to the parent of the target
	for (let i = 0; i < keys.length - 1; i++) {
		if (current == null || typeof current !== "object") return undefined;
		current = current[keys[i]];
	}

	// Get the final key and return the key-value pair
	const finalKey = keys[keys.length - 1];
	if (
		current == null ||
		typeof current !== "object" ||
		!(finalKey in current)
	) {
		return undefined;
	}

	return { [finalKey]: current[finalKey] };
};

/**
 * Merges options from multiple sources for Handlebars helpers
 * Replaces handlebars-utils util.options()
 * @param thisArg - The context (this) from the helper, may have an options property
 * @param locals - Local options or a Handlebars options object with hash
 * @param opts - Additional options or a Handlebars options object with hash
 * @returns Merged options object
 */
// biome-ignore lint/suspicious/noExplicitAny: handlebars helpers use any for context
export const options = (thisArg: any, locals?: any, opts?: any): any => {
	// biome-ignore lint/suspicious/noExplicitAny: result needs to be flexible object type
	const result: any = {};

	// Extract options from thisArg if it has an options property
	if (thisArg && typeof thisArg === "object" && thisArg.options) {
		Object.assign(result, thisArg.options);
	}

	// Handle locals - could be a Handlebars options object with hash, or direct options
	if (locals && typeof locals === "object") {
		if ("hash" in locals) {
			Object.assign(result, locals.hash);
		} else {
			Object.assign(result, locals);
		}
	}

	// Handle opts parameter - similar logic
	if (opts && typeof opts === "object") {
		if ("hash" in opts) {
			Object.assign(result, opts.hash);
		} else {
			Object.assign(result, opts);
		}
	}

	return result;
};
