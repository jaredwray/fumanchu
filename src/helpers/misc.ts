// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context

// Native implementation to replace get-value
const get = (object: any, path: string | string[]): any => {
	if (!object || typeof object !== "object") return undefined;

	const keys = Array.isArray(path) ? path : path.split(".");
	let result = object;

	for (const key of keys) {
		if (result == null || typeof result !== "object") return undefined;
		result = result[key];
	}

	return result;
};

// @ts-expect-error
import createFrame from "handlebars-helper-create-frame";
// @ts-expect-error
import util from "handlebars-utils";
import kindOf from "kind-of";
import type { Helper } from "../helper-registry.js";

const frame = createFrame as (this: any, ...args: any[]) => any;

function option(this: any, prop: string, locals?: any, options?: any): any {
	return get(util.options(this, locals, options), prop);
}

function noop(this: any, options: { fn: (context: any) => any }): any {
	return options.fn(this);
}

const typeOf = kindOf as (value: any) => string;

function withHash(
	this: any,
	options: {
		hash?: Record<string, any>;
		fn: (hash: Record<string, any>) => any;
		inverse: (context: any) => any;
	},
): any {
	if (options.hash && Object.keys(options.hash).length) {
		return options.fn(options.hash);
	}
	return options.inverse(this);
}

export const helpers: Helper[] = [
	{
		name: "frame",
		category: "misc",
		compatibility: ["browser", "nodejs"],
		fn: frame as any,
	},
	{
		name: "option",
		category: "misc",
		compatibility: ["browser", "nodejs"],
		fn: option,
	},
	{
		name: "noop",
		category: "misc",
		compatibility: ["browser", "nodejs"],
		fn: noop,
	},
	{
		name: "typeOf",
		category: "misc",
		compatibility: ["browser", "nodejs"],
		fn: typeOf as any,
	},
	{
		name: "withHash",
		category: "misc",
		compatibility: ["browser", "nodejs"],
		fn: withHash,
	},
];

export { frame, option, noop, typeOf, withHash };
