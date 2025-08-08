import type { Helper } from "../helper-registry.js";

const and = (...values: unknown[]): boolean => values.every(Boolean);

const compare = (a: unknown, operator: string, b: unknown): boolean => {
	switch (operator) {
		case "==":
			// biome-ignore lint/suspicious/noDoubleEquals: loose comparison is required
			return a == b;
		case "===":
			return a === b;
		case "!=":
			// biome-ignore lint/suspicious/noDoubleEquals: loose comparison is required
			return a != b;
		case "!==":
			return a !== b;
		case "<":
			return (a as number | string) < (b as number | string);
		case ">":
			return (a as number | string) > (b as number | string);
		case "<=":
			return (a as number | string) <= (b as number | string);
		case ">=":
			return (a as number | string) >= (b as number | string);
		case "typeof":
			// biome-ignore lint/correctness/useValidTypeof: dynamic comparison
			return typeof a === (b as string);
		default:
			return false;
	}
};

const contains = (
	collection: unknown,
	value: unknown,
	startIndex = 0,
): boolean => {
	if (Array.isArray(collection)) {
		const col = collection as unknown[];
		let start = startIndex;
		if (start < 0) {
			start = col.length + start;
		}
		return col.indexOf(value, start) !== -1;
	}
	if (typeof collection === "string" && typeof value === "string") {
		let start = startIndex;
		if (start < 0) {
			start = collection.length + start;
		}
		return collection.indexOf(value, start) !== -1;
	}
	if (
		collection &&
		typeof collection === "object" &&
		typeof value === "string"
	) {
		return value in (collection as Record<string, unknown>);
	}
	return false;
};

const defaultTo = (...values: unknown[]): unknown => {
	for (const value of values) {
		if (value != null) return value;
	}
	return "";
};

const eq = (a: unknown, b: unknown): boolean => a === b;

const gt = (a: unknown, b: unknown): boolean =>
	(a as number | string) > (b as number | string);

const gte = (a: unknown, b: unknown): boolean =>
	(a as number | string) >= (b as number | string);

const has = (value: unknown, pattern: unknown): boolean => {
	if (pattern === undefined) {
		if (value == null) return false;
		return Boolean(value);
	}
	if (Array.isArray(value)) {
		return (value as unknown[]).indexOf(pattern) !== -1;
	}
	if (typeof value === "string" && typeof pattern === "string") {
		return value.indexOf(pattern) !== -1;
	}
	if (value && typeof value === "object" && typeof pattern === "string") {
		return pattern in (value as Record<string, unknown>);
	}
	return false;
};

const isFalsey = (val: unknown): boolean => !val;

const isTruthy = (val: unknown): boolean => !!val;

const ifEven = (num: unknown): boolean =>
	typeof num === "number" && Number.isFinite(num) && num % 2 === 0;

const ifNth = (a: unknown, b: unknown): boolean =>
	typeof a === "number" && typeof b === "number" && b % a === 0;

const ifOdd = (num: unknown): boolean =>
	typeof num === "number" && Number.isFinite(num) && num % 2 !== 0;

// biome-ignore lint/suspicious/noDoubleEquals: loose comparison is required
const is = (a: unknown, b: unknown): boolean => a == b;

// biome-ignore lint/suspicious/noDoubleEquals: loose comparison is required
const isnt = (a: unknown, b: unknown): boolean => a != b;

const lt = (a: unknown, b: unknown): boolean =>
	(a as number | string) < (b as number | string);

const lte = (a: unknown, b: unknown): boolean =>
	(a as number | string) <= (b as number | string);

const neither = (a: unknown, b: unknown): boolean => !a && !b;

const not = (val: unknown): boolean => !val;

const or = (...values: unknown[]): boolean => values.some(Boolean);

const unlessEq = (a: unknown, b: unknown): boolean => a !== b;

const unlessGt = (a: unknown, b: unknown): boolean =>
	(a as number | string) <= (b as number | string);

const unlessLt = (a: unknown, b: unknown): boolean =>
	(a as number | string) >= (b as number | string);

const unlessGteq = (a: unknown, b: unknown): boolean =>
	(a as number | string) < (b as number | string);

const unlessLteq = (a: unknown, b: unknown): boolean =>
	(a as number | string) > (b as number | string);

export const helpers: Helper[] = [
	{ name: "and", category: "comparison", fn: and },
	{ name: "compare", category: "comparison", fn: compare },
	{ name: "contains", category: "comparison", fn: contains },
	{ name: "default", category: "comparison", fn: defaultTo },
	{ name: "eq", category: "comparison", fn: eq },
	{ name: "gt", category: "comparison", fn: gt },
	{ name: "gte", category: "comparison", fn: gte },
	{ name: "has", category: "comparison", fn: has },
	{ name: "isFalsey", category: "comparison", fn: isFalsey },
	{ name: "isTruthy", category: "comparison", fn: isTruthy },
	{ name: "ifEven", category: "comparison", fn: ifEven },
	{ name: "ifNth", category: "comparison", fn: ifNth },
	{ name: "ifOdd", category: "comparison", fn: ifOdd },
	{ name: "is", category: "comparison", fn: is },
	{ name: "isnt", category: "comparison", fn: isnt },
	{ name: "lt", category: "comparison", fn: lt },
	{ name: "lte", category: "comparison", fn: lte },
	{ name: "neither", category: "comparison", fn: neither },
	{ name: "not", category: "comparison", fn: not },
	{ name: "or", category: "comparison", fn: or },
	{ name: "unlessEq", category: "comparison", fn: unlessEq },
	{ name: "unlessGt", category: "comparison", fn: unlessGt },
	{ name: "unlessLt", category: "comparison", fn: unlessLt },
	{ name: "unlessGteq", category: "comparison", fn: unlessGteq },
	{ name: "unlessLteq", category: "comparison", fn: unlessLteq },
];

export {
	and,
	compare,
	contains,
	defaultTo,
	eq,
	gt,
	gte,
	has,
	isFalsey,
	isTruthy,
	ifEven,
	ifNth,
	ifOdd,
	is,
	isnt,
	lt,
	lte,
	neither,
	not,
	or,
	unlessEq,
	unlessGt,
	unlessLt,
	unlessGteq,
	unlessLteq,
};
