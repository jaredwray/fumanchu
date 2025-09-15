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
