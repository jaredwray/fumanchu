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
