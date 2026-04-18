// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context

import Handlebars from "handlebars";
import type { Helper } from "../helper-registry.js";
import { get, options } from "../utils.js";

const objectToString = Object.prototype.toString;

function ctorName(val: any): string | null {
	return typeof val.constructor === "function" ? val.constructor.name : null;
}

function isGeneratorFn(val: any): boolean {
	return ctorName(val) === "GeneratorFunction";
}

function isGeneratorObj(val: any): boolean {
	return (
		typeof val.throw === "function" &&
		typeof val.return === "function" &&
		typeof val.next === "function"
	);
}

function kindOf(val: any): string {
	if (val === undefined) return "undefined";
	if (val === null) return "null";

	const type = typeof val;
	if (type === "boolean") return "boolean";
	if (type === "string") return "string";
	if (type === "number") return "number";
	if (type === "symbol") return "symbol";
	if (type === "function") {
		return isGeneratorFn(val) ? "generatorfunction" : "function";
	}

	if (Array.isArray(val)) return "array";
	if (typeof Buffer !== "undefined" && Buffer.isBuffer?.(val)) return "buffer";
	if (
		typeof val === "object" &&
		val !== null &&
		typeof val.length === "number" &&
		objectToString.call(val) === "[object Arguments]"
	) {
		return "arguments";
	}
	if (val instanceof Date) return "date";
	if (val instanceof Error) return "error";
	if (val instanceof RegExp) return "regexp";

	switch (ctorName(val)) {
		case "Promise":
			return "promise";
		case "WeakMap":
			return "weakmap";
		case "WeakSet":
			return "weakset";
		case "Map":
			return "map";
		case "Set":
			return "set";
		case "Int8Array":
			return "int8array";
		case "Uint8Array":
			return "uint8array";
		case "Uint8ClampedArray":
			return "uint8clampedarray";
		case "Int16Array":
			return "int16array";
		case "Uint16Array":
			return "uint16array";
		case "Int32Array":
			return "int32array";
		case "Uint32Array":
			return "uint32array";
		case "Float32Array":
			return "float32array";
		case "Float64Array":
			return "float64array";
	}

	if (isGeneratorObj(val)) return "generator";

	const tag = objectToString.call(val);
	switch (tag) {
		case "[object Object]":
			return "object";
		case "[object Map Iterator]":
			return "mapiterator";
		case "[object Set Iterator]":
			return "setiterator";
		case "[object String Iterator]":
			return "stringiterator";
		case "[object Array Iterator]":
			return "arrayiterator";
	}
	return tag.slice(8, -1).toLowerCase().replace(/\s/g, "");
}

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

const typeOf = kindOf;

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

export { frame, noop, option, typeOf, withHash };
