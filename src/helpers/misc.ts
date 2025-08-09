// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context

import get from "get-value";
import createFrame from "handlebars-helper-create-frame";
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
	{ name: "frame", category: "misc", fn: frame as any },
	{ name: "option", category: "misc", fn: option },
	{ name: "noop", category: "misc", fn: noop },
	{ name: "typeOf", category: "misc", fn: typeOf as any },
	{ name: "withHash", category: "misc", fn: withHash },
];

export { frame, option, noop, typeOf, withHash };
