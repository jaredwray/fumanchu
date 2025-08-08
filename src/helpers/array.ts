import type { Helper } from "../helper-registry.js";

const after = <T>(array: unknown, n: number): T[] => {
	if (!Array.isArray(array)) return [];
	return array.slice(n);
};

const before = <T>(array: unknown, n: number): T[] => {
	if (!Array.isArray(array)) return [];
	return array.slice(0, -n);
};

const arrayify = <T>(value: T | T[] | null | undefined): T[] => {
	if (value == null) return [];
	return Array.isArray(value) ? value : [value];
};

const first = <T>(array: unknown, n?: number): T | T[] | undefined => {
	if (!Array.isArray(array)) return undefined;
	if (typeof n !== "number") {
		return array[0];
	}
	return array.slice(0, n);
};

const last = <T>(
	value: T[] | string | unknown,
	n?: number,
): T | T[] | string | undefined => {
	if (!Array.isArray(value) && typeof value !== "string") {
		return undefined;
	}
	if (typeof n !== "number") {
		const array = value as T[] | string;
		return array[(array as T[] | string).length - 1] as T | string;
	}
	const start = Math.abs(n);
	if (typeof value === "string") {
		return value.slice(-start);
	}
	return (value as T[]).slice(-start);
};

const length = (value: unknown): number => {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return Object.keys(value as Record<string, unknown>).length;
	}
	if (typeof value === "string" || Array.isArray(value)) {
		return (value as string | unknown[]).length;
	}
	return 0;
};

const join = (array: unknown, separator = ", "): string => {
	if (typeof array === "string") return array;
	if (!Array.isArray(array)) return "";
	return array.join(separator);
};

export const helpers: Helper[] = [
	{ name: "after", category: "array", fn: after },
	{ name: "before", category: "array", fn: before },
	{ name: "arrayify", category: "array", fn: arrayify },
	{ name: "first", category: "array", fn: first },
	{ name: "last", category: "array", fn: last },
	{ name: "length", category: "array", fn: length },
	{ name: "join", category: "array", fn: join },
];

export { after, before, arrayify, first, last, length, join };
