import type { Helper } from "../helper-registry.js";

type ForEachOptions<T> = {
	fn?: (context: T, frame?: { data: Record<string, unknown> }) => string;
	inverse?: (context?: unknown) => string;
	hash?: Record<string, unknown>;
	data?: Record<string, unknown>;
};

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

const forEach = function <T>(
	this: unknown,
	collection: unknown,
	options?: ForEachOptions<Record<string, unknown>>,
): string {
	if (
		!Array.isArray(collection) ||
		!options ||
		typeof options.fn !== "function"
	) {
		return options?.inverse ? (options.inverse(this) ?? "") : "";
	}

	if (collection.length === 0) {
		return options.inverse ? (options.inverse(this) ?? "") : "";
	}

	const total = collection.length;
	const hash = options.hash ?? {};
	const baseData = options.data ? { ...options.data } : undefined;
	let result = "";

	for (let index = 0; index < total; index++) {
		const value = collection[index];
		const meta = {
			index,
			total,
			isFirst: index === 0,
			isLast: index === total - 1,
		} satisfies Record<string, unknown>;

		const data = {
			...(baseData ? { ...baseData } : {}),
			...hash,
			...meta,
		} satisfies Record<string, unknown>;

		// For objects and arrays, create a shallow copy with metadata
		// For primitives, create a wrapper object with the value and metadata
		let context: Record<string, unknown>;
		if (value != null && typeof value === "object") {
			// Create a plain object with all properties from value and metadata
			context = { ...value, ...hash, ...meta };
		} else {
			// For primitives, create a wrapper with value property
			context = { value, ...hash, ...meta };
		}

		result += options.fn(context as T, { data });
	}

	return result;
};

export const helpers: Helper[] = [
	{
		name: "after",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: after,
	},
	{
		name: "before",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: before,
	},
	{
		name: "arrayify",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: arrayify,
	},
	{
		name: "first",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: first,
	},
	{
		name: "last",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: last,
	},
	{
		name: "length",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: length,
	},
	{
		name: "join",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: join,
	},
	{
		name: "forEach",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: forEach as Helper["fn"],
	},
];

export { after, before, arrayify, first, last, length, join, forEach };
export type { ForEachOptions };
