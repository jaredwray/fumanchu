import type { Helper } from "../helper-registry.js";

const isEmpty = (collection?: unknown): boolean => {
	if (collection == null) return true;
	if (Array.isArray(collection)) return collection.length === 0;
	if (typeof collection === "object")
		return Object.keys(collection).length === 0;
	return false;
};

const iterate = <T>(
	collection: Record<string, T> | T[] | undefined | null,
	fn: (value: T, key: string | number) => string,
	inverse?: () => string,
): string => {
	if (Array.isArray(collection)) {
		let result = "";
		for (let i = 0; i < collection.length; i++) {
			result += fn(collection[i], i);
		}
		return result;
	}
	if (collection && typeof collection === "object") {
		let result = "";
		for (const key of Object.keys(collection)) {
			result += fn((collection as Record<string, T>)[key], key);
		}
		return result;
	}
	return inverse ? inverse() : "";
};

export const helpers: Helper[] = [
	{ name: "isEmpty", category: "collection", fn: isEmpty },
	{ name: "iterate", category: "collection", fn: iterate },
];

export { isEmpty, iterate };
