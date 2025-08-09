// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context

import getObject from "get-object";
import get from "get-value";
import type { Helper } from "../helper-registry.js";
import { arrayify } from "./array.js";

const isOptions = (value: any): value is { hash: Record<string, any> } => {
	return Boolean(value && typeof value === "object" && "hash" in value);
};

const createFrame = (options: any, hash: any) => ({
	...(options?.data || {}),
	...hash,
});

const extend = (...objects: any[]): Record<string, any> => {
	const args = [...objects];
	if (args.length && isOptions(args[args.length - 1])) {
		const opts = args.pop() as { hash: Record<string, any> };
		args.push(opts.hash);
	}
	const result: Record<string, any> = {};
	for (const obj of args) {
		if (obj && typeof obj === "object" && !Array.isArray(obj)) {
			Object.assign(result, obj);
		}
	}
	return result;
};
const forIn = (obj: any, options: any): string => {
	if (!isOptions(options)) {
		return options?.inverse?.(obj) ?? "";
	}
	const data = createFrame(options, options.hash || {});
	let result = "";
	for (const key in obj) {
		data.key = key;
		result += options.fn(obj[key], { data });
	}
	return result;
};
const forOwn = (obj: any, options: any): string => {
	if (!isOptions(options)) {
		return options?.inverse?.(obj) ?? "";
	}
	const data = createFrame(options, options.hash || {});
	let result = "";
	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			data.key = key;
			result += options.fn(obj[key], { data });
		}
	}
	return result;
};

const toPath = (...prop: Array<string | number>): string => {
	const parts: Array<string | number> = [];
	for (const p of prop) {
		if (typeof p === "string" || typeof p === "number") {
			parts.push(p);
		}
	}
	return parts.join(".");
};
const getHelper = (prop: string, context: any, options?: any): any => {
	const val = get(context, prop);
	if (options && typeof options.fn === "function") {
		return val ? options.fn(val) : options.inverse?.(context);
	}
	return val;
};
const getObjectHelper = (prop: string, context: any): any => {
	return getObject(context, prop);
};
const hasOwn = (context: any, key: string): boolean => {
	return Object.hasOwn(context, key);
};

const isObject = (value: unknown): boolean => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};

const JSONparse = (str: string): any => {
	return JSON.parse(str);
};
const JSONstringify = (obj: any, indent?: number): string => {
	const ind = typeof indent === "number" ? indent : 0;
	return JSON.stringify(obj, null, ind);
};
const merge = (context: any, ...objects: any[]): Record<string, any> => {
	const args = [context, ...objects];
	if (args.length && isOptions(args[args.length - 1])) {
		const opts = args.pop() as { hash: Record<string, any> };
		args.push(opts.hash);
	}
	return Object.assign(...args);
};

const parseJSON = JSONparse;
const stringify = JSONstringify;
const pick = (props: string | string[], context: any, options?: any): any => {
	const keys = arrayify(props);
	let result: Record<string, any> = {};
	for (const key of keys) {
		result = Object.assign({}, result, getObject(context, key));
	}
	if (options && typeof options.fn === "function") {
		if (Object.keys(result).length) {
			return options.fn(result);
		}
		return options.inverse?.(context);
	}
	return result;
};

export const helpers: Helper[] = [
	{ name: "extend", category: "object", fn: extend },
	{ name: "forIn", category: "object", fn: forIn as any },
	{ name: "forOwn", category: "object", fn: forOwn as any },
	{ name: "toPath", category: "object", fn: toPath as any },
	{ name: "get", category: "object", fn: getHelper as any },
	{ name: "getObject", category: "object", fn: getObjectHelper as any },
	{ name: "hasOwn", category: "object", fn: hasOwn as any },
	{ name: "isObject", category: "object", fn: isObject as any },
	{ name: "JSONparse", category: "object", fn: JSONparse as any },
	{ name: "JSONstringify", category: "object", fn: JSONstringify as any },
	{ name: "merge", category: "object", fn: merge as any },
	{ name: "parseJSON", category: "object", fn: parseJSON as any },
	{ name: "pick", category: "object", fn: pick as any },
	{ name: "stringify", category: "object", fn: stringify as any },
];

export {
	extend,
	forIn,
	forOwn,
	toPath,
	getHelper as get,
	getObjectHelper as getObject,
	hasOwn,
	isObject,
	JSONparse,
	JSONstringify,
	merge,
	parseJSON,
	pick,
	stringify,
};
