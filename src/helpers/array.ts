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

const forEach = function <T extends Record<string, unknown>>(
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

type BlockHelperOptions = {
	fn?: (context?: unknown) => string;
	inverse?: (context?: unknown) => string;
	hash?: Record<string, unknown>;
	data?: Record<string, unknown>;
};

const inArray = function (
	this: unknown,
	array: unknown,
	value: unknown,
	options?: BlockHelperOptions,
): string {
	if (!Array.isArray(array) || !options) {
		return "";
	}

	const found = array.includes(value);

	if (found && options.fn) {
		return options.fn(this);
	}

	if (!found && options.inverse) {
		return options.inverse(this);
	}

	return "";
};

const isArray = (value: unknown): boolean => {
	return Array.isArray(value);
};

const itemAt = <T>(array: unknown, idx: number): T | undefined => {
	if (!Array.isArray(array)) return undefined;
	return array[idx];
};

const equalsLength = function (
	this: unknown,
	value: unknown,
	targetLength: number,
	options?: BlockHelperOptions,
): string | boolean {
	const actualLength = length(value);
	const isEqual = actualLength === targetLength;

	// If used as a block helper (has fn or inverse)
	if (options && (options.fn || options.inverse)) {
		if (isEqual && options.fn) {
			return options.fn(this);
		}
		if (!isEqual && options.inverse) {
			return options.inverse(this);
		}
		return "";
	}

	// If used as an inline helper
	return isEqual;
};

const some = function (
	this: unknown,
	array: unknown,
	iter: (value: unknown) => boolean,
	options?: BlockHelperOptions,
): string {
	/* v8 ignore next -- @preserve */
	if (!Array.isArray(array) || typeof iter !== "function" || !options) {
		return options?.inverse ? (options.inverse(this) ?? "") : "";
	}

	const hasSome = array.some(iter);

	if (hasSome && options.fn) {
		return options.fn(this);
	}

	if (!hasSome && options.inverse) {
		return options.inverse(this);
	}

	return "";
};

const eachIndex = function (
	this: unknown,
	array: unknown,
	options?: BlockHelperOptions,
): string {
	if (!Array.isArray(array) || !options || typeof options.fn !== "function") {
		return options?.inverse ? (options.inverse(this) ?? "") : "";
	}

	/* v8 ignore next -- @preserve */
	if (array.length === 0) {
		return options.inverse ? (options.inverse(this) ?? "") : "";
	}

	let result = "";

	for (let index = 0; index < array.length; index++) {
		const context = {
			item: array[index],
			index,
		};
		result += options.fn(context);
	}

	return result;
};

const withAfter = function (
	this: unknown,
	array: unknown,
	idx: number,
	options?: BlockHelperOptions,
): string {
	if (!Array.isArray(array) || !options || typeof options.fn !== "function") {
		return "";
	}

	const sliced = array.slice(idx + 1);

	/* v8 ignore next -- @preserve */
	if (sliced.length === 0) {
		return options.inverse ? (options.inverse(this) ?? "") : "";
	}

	let result = "";
	for (const item of sliced) {
		result += options.fn(item);
	}

	return result;
};

const withBefore = function (
	this: unknown,
	array: unknown,
	idx: number,
	options?: BlockHelperOptions,
): string {
	if (!Array.isArray(array) || !options || typeof options.fn !== "function") {
		return "";
	}

	const sliced = array.slice(0, idx);

	/* v8 ignore next -- @preserve */
	if (sliced.length === 0) {
		return options.inverse ? (options.inverse(this) ?? "") : "";
	}

	let result = "";
	for (const item of sliced) {
		result += options.fn(item);
	}

	return result;
};

const withFirst = function (
	this: unknown,
	array: unknown,
	n: number | BlockHelperOptions | undefined,
	options?: BlockHelperOptions,
): string {
	// Handle optional n parameter
	let count = 1;
	let opts = options;

	if (typeof n === "object" && n !== null && !Array.isArray(n)) {
		opts = n as BlockHelperOptions;
	} else if (typeof n === "number") {
		count = n;
	}

	if (!Array.isArray(array) || !opts || typeof opts.fn !== "function") {
		return "";
	}

	/* v8 ignore next -- @preserve */
	if (array.length === 0) {
		return opts.inverse ? (opts.inverse(this) ?? "") : "";
	}

	const items = array.slice(0, count);
	let result = "";

	for (const item of items) {
		result += opts.fn(item);
	}

	return result;
};

const withLast = function (
	this: unknown,
	array: unknown,
	n: number | BlockHelperOptions | undefined,
	options?: BlockHelperOptions,
): string {
	// Handle optional n parameter
	let count = 1;
	let opts = options;

	if (typeof n === "object" && n !== null && !Array.isArray(n)) {
		opts = n as BlockHelperOptions;
	} else if (typeof n === "number") {
		count = n;
	}

	if (!Array.isArray(array) || !opts || typeof opts.fn !== "function") {
		return "";
	}

	/* v8 ignore next -- @preserve */
	if (array.length === 0) {
		return opts.inverse ? (opts.inverse(this) ?? "") : "";
	}

	const items = array.slice(-count);
	let result = "";

	for (const item of items) {
		result += opts.fn(item);
	}

	return result;
};

const withGroup = function (
	this: unknown,
	array: unknown,
	size: number,
	options?: BlockHelperOptions,
): string {
	if (
		!Array.isArray(array) ||
		typeof size !== "number" ||
		size <= 0 ||
		!options ||
		typeof options.fn !== "function"
	) {
		return "";
	}

	/* v8 ignore next -- @preserve */
	if (array.length === 0) {
		return options.inverse ? (options.inverse(this) ?? "") : "";
	}

	let result = "";
	const groups: unknown[][] = [];

	for (let i = 0; i < array.length; i += size) {
		groups.push(array.slice(i, i + size));
	}

	for (const group of groups) {
		result += options.fn(group);
	}

	return result;
};

const withSort = function (
	this: unknown,
	array: unknown,
	prop: string | BlockHelperOptions | undefined,
	options?: BlockHelperOptions,
): string {
	// Handle optional prop parameter
	let sortProp: string | undefined;
	let opts = options;

	if (typeof prop === "object" && prop !== null && !Array.isArray(prop)) {
		opts = prop as BlockHelperOptions;
	} else if (typeof prop === "string") {
		sortProp = prop;
	}

	if (!Array.isArray(array) || !opts || typeof opts.fn !== "function") {
		return "";
	}

	/* v8 ignore next -- @preserve */
	if (array.length === 0) {
		return opts.inverse ? (opts.inverse(this) ?? "") : "";
	}

	// Create a copy to avoid mutating the original array
	const sorted = [...array];

	// Sort the array
	if (sortProp) {
		// Sort by property
		sorted.sort((a, b) => {
			const aVal = a?.[sortProp];
			const bVal = b?.[sortProp];

			/* v8 ignore next -- @preserve */
			if (aVal === bVal) return 0;
			if (aVal == null) return 1;
			if (bVal == null) return -1;

			/* v8 ignore next -- @preserve */
			if (typeof aVal === "string" && typeof bVal === "string") {
				return aVal.localeCompare(bVal);
			}

			/* v8 ignore next -- @preserve */
			return aVal < bVal ? -1 : 1;
		});
	} else {
		// Sort primitives
		sorted.sort((a, b) => {
			/* v8 ignore next -- @preserve */
			if (a === b) return 0;
			if (a == null) return 1;
			if (b == null) return -1;

			if (typeof a === "string" && typeof b === "string") {
				return a.localeCompare(b);
			}

			return a < b ? -1 : 1;
		});
	}

	// Check for reverse option in hash
	const shouldReverse =
		opts.hash?.reverse === true || opts.hash?.reverse === "true";
	if (shouldReverse) {
		sorted.reverse();
	}

	let result = "";
	for (const item of sorted) {
		result += opts.fn(item);
	}

	return result;
};

const filter = function (
	this: unknown,
	array: unknown,
	value: unknown,
	options?: BlockHelperOptions,
): string {
	/* v8 ignore next -- @preserve */
	if (!Array.isArray(array) || !options) {
		return options?.inverse ? (options.inverse(this) ?? "") : "";
	}

	const filtered = array.filter((item) => item === value);

	if (filtered.length > 0 && options.fn) {
		return options.fn(this);
	}

	/* v8 ignore next -- @preserve */
	if (filtered.length === 0 && options.inverse) {
		return options.inverse(this);
	}

	/* v8 ignore next -- @preserve */
	return "";
};

const map = <T, R>(array: unknown, fn: (value: T) => R): R[] => {
	if (!Array.isArray(array) || typeof fn !== "function") {
		return [];
	}

	return array.map(fn);
};

const pluck = (collection: unknown, prop: string): unknown[] => {
	if (!Array.isArray(collection) || typeof prop !== "string") {
		return [];
	}

	return collection.map((item) => {
		if (item == null || typeof item !== "object") {
			return undefined;
		}

		// Support dot notation
		const parts = prop.split(".");
		let value: unknown = item;

		for (const part of parts) {
			/* v8 ignore next -- @preserve */
			if (value == null || typeof value !== "object") {
				return undefined;
			}
			value = (value as Record<string, unknown>)[part];
		}

		return value;
	});
};

const reverse = <T>(value: unknown): T[] | string | undefined => {
	if (typeof value === "string") {
		return value.split("").reverse().join("");
	}

	if (Array.isArray(value)) {
		return [...value].reverse();
	}

	return undefined;
};

const sort = <T>(
	array: unknown,
	key?: string | ((a: T, b: T) => number),
): T[] => {
	if (!Array.isArray(array)) {
		return [];
	}

	const sorted = [...array];

	if (typeof key === "function") {
		sorted.sort(key);
	} else if (typeof key === "string") {
		/* v8 ignore next -- @preserve */
		sorted.sort((a, b) => {
			const aVal = a?.[key];
			const bVal = b?.[key];

			/* v8 ignore next -- @preserve */
			if (aVal === bVal) return 0;
			/* v8 ignore next -- @preserve */
			if (aVal == null) return 1;
			if (bVal == null) return -1;

			if (typeof aVal === "string" && typeof bVal === "string") {
				return aVal.localeCompare(bVal);
			}

			/* v8 ignore next -- @preserve */
			return aVal < bVal ? -1 : 1;
		});
	} else {
		sorted.sort((a, b) => {
			if (a === b) return 0;
			if (a == null) return 1;
			if (b == null) return -1;

			if (typeof a === "string" && typeof b === "string") {
				return a.localeCompare(b);
			}

			return a < b ? -1 : 1;
		});
	}

	return sorted;
};

const sortBy = <T>(array: unknown, ...props: string[]): T[] => {
	if (!Array.isArray(array) || props.length === 0) {
		return [];
	}

	const sorted = [...array];

	sorted.sort((a, b) => {
		for (const prop of props) {
			const aVal = a?.[prop];
			const bVal = b?.[prop];

			if (aVal === bVal) continue;
			if (aVal == null) return 1;
			if (bVal == null) return -1;

			if (typeof aVal === "string" && typeof bVal === "string") {
				const result = aVal.localeCompare(bVal);
				/* v8 ignore next -- @preserve */
				if (result !== 0) return result;
			} else {
				return aVal < bVal ? -1 : 1;
			}
		}

		/* v8 ignore next -- @preserve */
		return 0;
	});

	return sorted;
};

const unique = function (
	this: unknown,
	array: unknown,
	options?: BlockHelperOptions,
): string | unknown[] {
	if (!Array.isArray(array)) {
		// If used as inline helper
		/* v8 ignore next -- @preserve */
		if (!options) {
			return [];
		}
		// If used as block helper
		/* v8 ignore next -- @preserve */
		return options.inverse ? (options.inverse(this) ?? "") : "";
	}

	const uniqueArray = [...new Set(array)];

	// If used as inline helper (no options)
	if (!options) {
		return uniqueArray;
	}

	// If used as block helper
	if (uniqueArray.length === 0 && options.inverse) {
		return options.inverse(this);
	}

	if (uniqueArray.length > 0 && options.fn) {
		let result = "";
		for (const item of uniqueArray) {
			result += options.fn(item);
		}
		return result;
	}

	return "";
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
	{
		name: "inArray",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: inArray as Helper["fn"],
	},
	{
		name: "isArray",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: isArray,
	},
	{
		name: "itemAt",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: itemAt,
	},
	{
		name: "equalsLength",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: equalsLength as Helper["fn"],
	},
	{
		name: "some",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: some as Helper["fn"],
	},
	{
		name: "eachIndex",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: eachIndex as Helper["fn"],
	},
	{
		name: "withAfter",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: withAfter as Helper["fn"],
	},
	{
		name: "withBefore",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: withBefore as Helper["fn"],
	},
	{
		name: "withFirst",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: withFirst as Helper["fn"],
	},
	{
		name: "withLast",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: withLast as Helper["fn"],
	},
	{
		name: "withGroup",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: withGroup as Helper["fn"],
	},
	{
		name: "withSort",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: withSort as Helper["fn"],
	},
	{
		name: "filter",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: filter as Helper["fn"],
	},
	{
		name: "map",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: map,
	},
	{
		name: "pluck",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: pluck,
	},
	{
		name: "reverse",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: reverse,
	},
	{
		name: "sort",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: sort,
	},
	{
		name: "sortBy",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: sortBy,
	},
	{
		name: "unique",
		category: "array",
		compatibility: ["browser", "nodejs"],
		fn: unique as Helper["fn"],
	},
];

export {
	after,
	before,
	arrayify,
	first,
	last,
	length,
	join,
	forEach,
	inArray,
	isArray,
	itemAt,
	equalsLength,
	some,
	eachIndex,
	withAfter,
	withBefore,
	withFirst,
	withLast,
	withGroup,
	withSort,
	filter,
	map,
	pluck,
	reverse,
	sort,
	sortBy,
	unique,
};
export type { ForEachOptions, BlockHelperOptions };
