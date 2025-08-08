// biome-ignore-all lint/suspicious/noExplicitAny lint/suspicious/noDoubleEquals: helpers accept any values
import type { Helper } from "../helper-registry.js";

const and = (...values: any[]): boolean => values.every(Boolean);

const compare = (a: any, operator: string, b: any): boolean => {
	switch (operator) {
		case "==":
			return a == b; // eslint-disable-line eqeqeq
		case "===":
			return a === b;
		case "!=":
			return a != b; // eslint-disable-line eqeqeq
		case "!==":
			return a !== b;
		case "<":
			return a < b;
		case ">":
			return a > b;
		case "<=":
			return a <= b;
		case ">=":
			return a >= b;
		case "typeof":
			return typeof a === b;
		default:
			throw new Error(`helper {{compare}}: invalid operator: '${operator}'`);
	}
};

const contains = (collection: any, value: any, startIndex = 0): boolean => {
	if (collection == null) return false;
	if (typeof collection === "string" || Array.isArray(collection)) {
		return collection.indexOf(value, startIndex) > -1;
	}
	if (typeof collection === "object") {
		return value in collection;
	}
	return false;
};

const defaultHelper = (...values: any[]): any => {
	for (const val of values) {
		if (val != null) return val;
	}
	return "";
};

const eq = (a: any, b: any): boolean => a === b;

const gt = (a: any, b: any): boolean => a > b;

const gte = (a: any, b: any): boolean => a >= b;

const has = (value: any, pattern: any): boolean => {
	if (value == null || pattern == null) return false;
	if (Array.isArray(value) || typeof value === "string") {
		return value.indexOf(pattern) > -1;
	}
	if (typeof value === "object") {
		return pattern in value;
	}
	return false;
};

const falsey = (val: any, keywords?: string | string[]): boolean => {
	if (!val) return true;
	const words: string[] = Array.isArray(keywords)
		? keywords
		: keywords != null
			? [keywords]
			: [
					"0",
					"false",
					"nada",
					"nil",
					"nay",
					"nah",
					"negative",
					"no",
					"none",
					"nope",
					"nul",
					"null",
					"nix",
					"nyet",
					"uh-uh",
					"veto",
					"zero",
				];
	const lower = typeof val === "string" ? val.toLowerCase() : null;
	for (const word of words) {
		if (word === val) return true;
		if (lower != null && word === lower) return true;
	}
	return false;
};

const isFalsey = (val: any): boolean => falsey(val);

const isTruthy = (val: any): boolean => !falsey(val);

const ifEven = (num: any): boolean => typeof num === "number" && num % 2 === 0;

const ifNth = (a: any, b: any): boolean =>
	typeof a === "number" && typeof b === "number" && b % a === 0;

const ifOdd = (val: any): boolean =>
	typeof val === "number" && Math.abs(val % 2) === 1;

const is = (a: any, b: any): boolean => a == b; // eslint-disable-line eqeqeq

const isnt = (a: any, b: any): boolean => a != b; // eslint-disable-line eqeqeq

const lt = (a: any, b: any): boolean => a < b;

const lte = (a: any, b: any): boolean => a <= b;

const neither = (a: any, b: any): boolean => !a && !b;

const not = (val: any): boolean => !val;

const or = (...values: any[]): boolean => values.some(Boolean);

const unlessEq = (a: any, b: any): boolean => a !== b;

const unlessGt = (a: any, b: any): boolean => a <= b;

const unlessLt = (a: any, b: any): boolean => a >= b;

const unlessGteq = (a: any, b: any): boolean => a < b;

const unlessLteq = (a: any, b: any): boolean => a > b;

export const helpers: Helper[] = [
	{ name: "and", category: "comparison", fn: and },
	{ name: "compare", category: "comparison", fn: compare },
	{ name: "contains", category: "comparison", fn: contains },
	{ name: "default", category: "comparison", fn: defaultHelper },
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
	defaultHelper as default,
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
