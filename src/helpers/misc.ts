// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context

import Handlebars from "handlebars";
import kindOf from "kind-of";
import type { Helper } from "../helper-registry.js";
import { get, options } from "../utils.js";

/**
 * Block helper for exposing private `@` variables on the context
 * Replaces the external handlebars-helper-create-frame package
 */
function frame(this: any, context: any, options: any): any {
	// Handle parameter reassignment if context is an object with a hash property
	if (typeof context === "object" && context !== null && "hash" in context) {
		options = context;
		context = options.data;
	}

	// Create a new frame using Handlebars' built-in createFrame
	const data = Handlebars.createFrame(context || {});

	// Ensure options is an object
	if (typeof options !== "object" || options === null) {
		options = {};
	}

	// Extend the frame with hash arguments
	if (options.hash && typeof options.hash === "object") {
		Object.assign(data, options.hash);
	}

	// Execute the block function with the frame data
	return options.fn(this, { data });
}

function option(this: any, prop: string, locals?: any, opts?: any): any {
	return get(options(this, locals, opts), prop);
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
