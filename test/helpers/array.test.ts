import { describe, expect, it } from "vitest";
import type {
	BlockHelperOptions,
	ForEachOptions,
} from "../../src/helpers/array.js";
import { helpers } from "../../src/helpers/array.js";
import { fumanchu } from "../../src/index.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("after", () => {
	const afterFn = getHelper("after");
	it("returns items after the given index", () => {
		expect(afterFn(["a", "b", "c"], 1)).toEqual(["b", "c"]);
	});
	it("returns [] for non-arrays", () => {
		expect(afterFn("not array", 1)).toEqual([]);
	});
});

describe("arrayify", () => {
	const arrayifyFn = getHelper("arrayify");
	it("wraps values in an array", () => {
		expect(arrayifyFn("foo")).toEqual(["foo"]);
		expect(arrayifyFn(["foo"])).toEqual(["foo"]);
	});
	it("handles null and undefined", () => {
		expect(arrayifyFn(null)).toEqual([]);
		expect(arrayifyFn(undefined)).toEqual([]);
	});
});

describe("before", () => {
	const beforeFn = getHelper("before");
	it("returns items before the given index", () => {
		expect(beforeFn(["a", "b", "c"], 1)).toEqual(["a", "b"]);
	});
	it("returns [] for non-arrays", () => {
		expect(beforeFn("not array", 1)).toEqual([]);
	});
});

describe("first", () => {
	const firstFn = getHelper("first");
	it("returns first item or items", () => {
		expect(firstFn([1, 2, 3])).toBe(1);
		expect(firstFn([1, 2, 3], 2)).toEqual([1, 2]);
	});
	it("returns undefined for non-arrays", () => {
		expect(firstFn("nope")).toBeUndefined();
	});
});

describe("last", () => {
	const lastFn = getHelper("last");
	it("returns last item", () => {
		expect(lastFn([1, 2, 3])).toBe(3);
	});
	it("handles negative n values", () => {
		expect(lastFn([1, 2, 3, 4], -2)).toEqual([3, 4]);
	});
	it("handles strings with n", () => {
		expect(lastFn("hello", 2)).toBe("lo");
	});
	it("returns undefined for non-array/non-string", () => {
		expect(lastFn(123, 1)).toBeUndefined();
	});
});

describe("length", () => {
	const lengthFn = getHelper("length");
	it("returns length of arrays, strings, or objects", () => {
		expect(lengthFn([1, 2, 3])).toBe(3);
		expect(lengthFn("abc")).toBe(3);
		expect(lengthFn({ a: 1, b: 2 })).toBe(2);
	});
	it("returns 0 for numbers or booleans", () => {
		expect(lengthFn(123)).toBe(0);
		expect(lengthFn(true)).toBe(0);
	});
});

describe("join", () => {
	const joinFn = getHelper("join");
	it("joins arrays", () => {
		expect(joinFn(["a", "b"], "-")).toBe("a-b");
	});
	it("echoes string input", () => {
		expect(joinFn("hi")).toBe("hi");
	});
	it("returns empty string for non-string/non-array", () => {
		expect(joinFn(123)).toBe("");
	});
});

describe("forEach", () => {
	type ForEachHelper = (
		this: unknown,
		collection: unknown,
		options?: ForEachOptions<Record<string, unknown>>,
	) => string;

	const forEachFn = getHelper("forEach") as ForEachHelper;

	it("iterates arrays and exposes metadata", () => {
		const accounts = [
			{ name: "John", email: "john@example.com" },
			{ name: "Malcolm", email: "malcolm@example.com" },
			{ name: "David", email: "david@example.com" },
		];

		const contexts: Array<Record<string, unknown>> = [];

		const result = forEachFn.call({ company: "Initech" }, accounts, {
			hash: { company: "Initech" },
			data: { root: { description: "accounts" } },
			fn(context) {
				const account = context as {
					name: string;
					email: string;
					index: number;
					total: number;
					isFirst: boolean;
					isLast: boolean;
					company: string;
				};

				contexts.push({
					name: account.name,
					email: account.email,
					index: account.index,
					total: account.total,
					isFirst: account.isFirst,
					isLast: account.isLast,
					company: account.company,
				});
				return account.name;
			},
		});

		expect(result).toBe("JohnMalcolmDavid");
		expect(contexts).toEqual([
			{
				name: "John",
				email: "john@example.com",
				index: 0,
				total: 3,
				isFirst: true,
				isLast: false,
				company: "Initech",
			},
			{
				name: "Malcolm",
				email: "malcolm@example.com",
				index: 1,
				total: 3,
				isFirst: false,
				isLast: false,
				company: "Initech",
			},
			{
				name: "David",
				email: "david@example.com",
				index: 2,
				total: 3,
				isFirst: false,
				isLast: true,
				company: "Initech",
			},
		]);
	});

	it("provides private data frame values", () => {
		const indexes: Array<number | undefined> = [];
		const totals: Array<number | undefined> = [];
		const extras: Array<string | undefined> = [];

		forEachFn.call({}, ["alpha", "beta"], {
			hash: { extra: "value" },
			data: { root: { type: "strings" } },
			fn: (_context, frame) => {
				indexes.push(frame?.data?.index as number | undefined);
				totals.push(frame?.data?.total as number | undefined);
				extras.push(frame?.data?.extra as string | undefined);
				return "";
			},
		});

		expect(indexes).toEqual([0, 1]);
		expect(totals).toEqual([2, 2]);
		expect(extras).toEqual(["value", "value"]);
	});

	it("renders inverse block when collection is missing or empty", () => {
		let inverseContext: unknown;
		const inverseResult = forEachFn.call({ foo: "bar" }, undefined, {
			inverse(context?: unknown) {
				inverseContext = context;
				return "inverse";
			},
		});

		expect(inverseResult).toBe("inverse");
		expect(inverseContext).toEqual({ foo: "bar" });

		const fallbackResult = forEachFn.call({}, undefined, {
			inverse() {
				return undefined;
			},
		});

		expect(fallbackResult).toBe("");

		let fnCalled = false;
		const emptyResult = forEachFn.call({}, [], {
			fn() {
				fnCalled = true;
				return "";
			},
			inverse() {
				return "empty";
			},
		});

		expect(emptyResult).toBe("empty");
		expect(fnCalled).toBe(false);

		const emptyFallback = forEachFn.call({}, [], {
			fn() {
				throw new Error("should not run");
			},
			inverse() {
				return undefined;
			},
		});

		expect(emptyFallback).toBe("");
	});

	it("returns empty string for empty arrays without inverse", () => {
		let executions = 0;
		const result = forEachFn.call({}, [], {
			fn() {
				executions += 1;
				return "should not render";
			},
		});

		expect(result).toBe("");
		expect(executions).toBe(0);
	});

	it("returns empty string for non-arrays without inverse", () => {
		let fnCalls = 0;
		const output = forEachFn.call(
			{},
			{ not: "array" },
			{
				fn() {
					fnCalls += 1;
					return "should not run";
				},
			},
		);

		expect(output).toBe("");
		expect(fnCalls).toBe(0);
	});

	it("propagates metadata when hash and data are omitted", () => {
		const contexts: Array<Record<string, unknown>> = [];
		const frames: Array<Record<string, unknown> | undefined> = [];

		const output = forEachFn.call({}, ["x", "y"], {
			fn(context, frame) {
				contexts.push({ ...context } as Record<string, unknown>);
				frames.push(frame?.data);
				return context.value as string;
			},
		});

		expect(output).toBe("xy");
		expect(contexts).toEqual([
			{
				value: "x",
				index: 0,
				total: 2,
				isFirst: true,
				isLast: false,
			},
			{
				value: "y",
				index: 1,
				total: 2,
				isFirst: false,
				isLast: true,
			},
		]);
		expect(frames).toEqual([
			{
				index: 0,
				total: 2,
				isFirst: true,
				isLast: false,
			},
			{
				index: 1,
				total: 2,
				isFirst: false,
				isLast: true,
			},
		]);
	});

	it("handles symbols and other primitive types", () => {
		const sentinel = Symbol("sentinel");
		const contexts: Array<Record<string, unknown>> = [];

		forEachFn.call({}, [sentinel, 123, "test", true, null, undefined], {
			fn(context) {
				contexts.push(context as Record<string, unknown>);
				return "";
			},
		});

		expect(contexts).toHaveLength(6);
		expect(contexts[0].value).toBe(sentinel);
		expect(contexts[0].index).toBe(0);
		expect(contexts[0].isFirst).toBe(true);

		expect(contexts[1].value).toBe(123);
		expect(contexts[2].value).toBe("test");
		expect(contexts[3].value).toBe(true);
		expect(contexts[4].value).toBe(null);
		expect(contexts[5].value).toBe(undefined);
		expect(contexts[5].isLast).toBe(true);
	});

	it("works with Handlebars markup template", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#forEach items}}" +
				"{{#if isFirst}}First: {{/if}}" +
				"{{#if isLast}}Last: {{/if}}" +
				"Item {{index}}: {{name}} ({{email}})" +
				"{{#unless isLast}}, {{/unless}}" +
				"{{/forEach}}",
		);

		const data = {
			items: [
				{ name: "Alice", email: "alice@example.com" },
				{ name: "Bob", email: "bob@example.com" },
				{ name: "Charlie", email: "charlie@example.com" },
			],
		};

		const result = template(data);
		expect(result).toBe(
			"First: Item 0: Alice (alice@example.com), " +
				"Item 1: Bob (bob@example.com), " +
				"Last: Item 2: Charlie (charlie@example.com)",
		);
	});

	it("works with Handlebars markup template using else block", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#forEach items}}" +
				"- {{title}}" +
				"{{else}}" +
				"No items found" +
				"{{/forEach}}",
		);

		const withItems = template({
			items: [{ title: "Task 1" }, { title: "Task 2" }],
		});
		expect(withItems).toBe("- Task 1- Task 2");

		const withoutItems = template({ items: [] });
		expect(withoutItems).toBe("No items found");

		const withNull = template({ items: null });
		expect(withNull).toBe("No items found");
	});

	it("works with Handlebars markup template with primitive values", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#forEach items}}" +
				"{{#if isFirst}}[{{/if}}" +
				"{{value}}" +
				"{{#if isLast}}]{{else}}, {{/if}}" +
				"{{/forEach}}",
		);

		const data = {
			items: ["apple", "banana", "cherry"],
		};

		const result = template(data);
		expect(result).toBe("[apple, banana, cherry]");
	});
});

describe("inArray", () => {
	type InArrayHelper = (
		this: unknown,
		array: unknown,
		value: unknown,
		options?: BlockHelperOptions,
	) => string;

	const inArrayFn = getHelper("inArray") as InArrayHelper;

	it("renders fn block when value is found in array", () => {
		const result = inArrayFn.call({ context: "test" }, ["a", "b", "c"], "b", {
			fn(context) {
				expect(context).toEqual({ context: "test" });
				return "found";
			},
		});

		expect(result).toBe("found");
	});

	it("renders inverse block when value is not found in array", () => {
		const result = inArrayFn.call({ context: "test" }, ["a", "b", "c"], "d", {
			fn() {
				throw new Error("should not run");
			},
			inverse(context) {
				expect(context).toEqual({ context: "test" });
				return "not found";
			},
		});

		expect(result).toBe("not found");
	});

	it("returns empty string when array is not an array", () => {
		const result = inArrayFn.call({}, "not array", "value", {
			fn() {
				return "found";
			},
		});

		expect(result).toBe("");
	});

	it("returns empty string when options is not provided", () => {
		const result = inArrayFn.call({}, ["a", "b"], "a", undefined);
		expect(result).toBe("");
	});

	it("returns empty string when value is found but no fn provided", () => {
		const result = inArrayFn.call({}, ["a", "b"], "a", {});
		expect(result).toBe("");
	});

	it("returns empty string when value is not found and no inverse provided", () => {
		const result = inArrayFn.call({}, ["a", "b"], "c", {
			fn() {
				return "found";
			},
		});
		expect(result).toBe("");
	});

	it("works with Handlebars markup template", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			'{{#inArray array "d"}}' +
				"  found" +
				"{{else}}" +
				"  not found" +
				"{{/inArray}}",
		);

		const withValue = template({ array: ["a", "b", "c"] });
		expect(withValue).toBe("  not found");

		const withMatch = template({ array: ["a", "b", "d"] });
		expect(withMatch).toBe("  found");
	});
});

describe("isArray", () => {
	const isArrayFn = getHelper("isArray");

	it("returns true for arrays", () => {
		expect(isArrayFn([])).toBe(true);
		expect(isArrayFn([1, 2, 3])).toBe(true);
		expect(isArrayFn(["a", "b"])).toBe(true);
	});

	it("returns false for non-arrays", () => {
		expect(isArrayFn("abc")).toBe(false);
		expect(isArrayFn(123)).toBe(false);
		expect(isArrayFn({ a: 1 })).toBe(false);
		expect(isArrayFn(null)).toBe(false);
		expect(isArrayFn(undefined)).toBe(false);
		expect(isArrayFn(true)).toBe(false);
	});

	it("works with Handlebars markup template", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#if (isArray value)}}is array{{else}}not array{{/if}}",
		);

		expect(template({ value: [1, 2, 3] })).toBe("is array");
		expect(template({ value: "string" })).toBe("not array");
	});
});

describe("itemAt", () => {
	const itemAtFn = getHelper("itemAt");

	it("returns item at specified index", () => {
		expect(itemAtFn(["a", "b", "c"], 0)).toBe("a");
		expect(itemAtFn(["a", "b", "c"], 1)).toBe("b");
		expect(itemAtFn(["a", "b", "c"], 2)).toBe("c");
	});

	it("returns undefined for out of bounds index", () => {
		expect(itemAtFn(["a", "b"], 5)).toBeUndefined();
		expect(itemAtFn(["a", "b"], -1)).toBeUndefined();
	});

	it("returns undefined for non-arrays", () => {
		expect(itemAtFn("not array", 0)).toBeUndefined();
		expect(itemAtFn(123, 0)).toBeUndefined();
		expect(itemAtFn(null, 0)).toBeUndefined();
	});

	it("works with Handlebars markup template", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile("{{itemAt array 1}}");

		expect(template({ array: ["a", "b", "c"] })).toBe("b");
	});
});

describe("equalsLength", () => {
	type EqualsLengthHelper = (
		this: unknown,
		value: unknown,
		targetLength: number,
		options?: BlockHelperOptions,
	) => string | boolean;

	const equalsLengthFn = getHelper("equalsLength") as EqualsLengthHelper;

	it("returns true when length matches (inline mode)", () => {
		expect(equalsLengthFn.call({}, [1, 2, 3], 3)).toBe(true);
		expect(equalsLengthFn.call({}, "abc", 3)).toBe(true);
		expect(equalsLengthFn.call({}, { a: 1, b: 2 }, 2)).toBe(true);
	});

	it("returns false when length does not match (inline mode)", () => {
		expect(equalsLengthFn.call({}, [1, 2], 3)).toBe(false);
		expect(equalsLengthFn.call({}, "ab", 3)).toBe(false);
		expect(equalsLengthFn.call({}, { a: 1 }, 2)).toBe(false);
	});

	it("renders fn block when length matches (block mode)", () => {
		const result = equalsLengthFn.call({ ctx: "test" }, [1, 2, 3], 3, {
			fn(context) {
				expect(context).toEqual({ ctx: "test" });
				return "matches";
			},
		});

		expect(result).toBe("matches");
	});

	it("renders inverse block when length does not match (block mode)", () => {
		const result = equalsLengthFn.call({ ctx: "test" }, [1, 2], 3, {
			fn() {
				throw new Error("should not run");
			},
			inverse(context) {
				expect(context).toEqual({ ctx: "test" });
				return "no match";
			},
		});

		expect(result).toBe("no match");
	});

	it("returns boolean when empty options object is provided", () => {
		const matchResult = equalsLengthFn.call({}, [1, 2, 3], 3, {});
		expect(matchResult).toBe(true);

		const noMatchResult = equalsLengthFn.call({}, [1, 2], 3, {});
		expect(noMatchResult).toBe(false);
	});

	it("returns empty string when length matches but only inverse provided", () => {
		const result = equalsLengthFn.call({}, [1, 2, 3], 3, {
			inverse() {
				return "no match";
			},
		});
		expect(result).toBe("");
	});

	it("returns empty string when length does not match but only fn provided", () => {
		const result = equalsLengthFn.call({}, [1, 2], 3, {
			fn() {
				return "match";
			},
		});
		expect(result).toBe("");
	});

	it("works with Handlebars markup template", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#equalsLength array 3}}" +
				"has 3 items" +
				"{{else}}" +
				"does not have 3 items" +
				"{{/equalsLength}}",
		);

		expect(template({ array: [1, 2, 3] })).toBe("has 3 items");
		expect(template({ array: [1, 2] })).toBe("does not have 3 items");
	});

	it("works as inline helper in Handlebars", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#if (equalsLength array 2)}}yes{{else}}no{{/if}}",
		);

		expect(template({ array: [1, 2] })).toBe("yes");
		expect(template({ array: [1, 2, 3] })).toBe("no");
	});
});

describe("some", () => {
	type SomeHelper = (
		this: unknown,
		array: unknown,
		iter: (value: unknown) => boolean,
		options?: BlockHelperOptions,
	) => string;

	const someFn = getHelper("some") as SomeHelper;

	it("renders fn block when some elements match condition", () => {
		const isString = (value: unknown) => typeof value === "string";

		const result = someFn.call({ ctx: "test" }, [1, "b", 3], isString, {
			fn(context) {
				expect(context).toEqual({ ctx: "test" });
				return "has string";
			},
		});

		expect(result).toBe("has string");
	});

	it("renders inverse block when no elements match condition", () => {
		const isString = (value: unknown) => typeof value === "string";

		const result = someFn.call({ ctx: "test" }, [1, 2, 3], isString, {
			fn() {
				throw new Error("should not run");
			},
			inverse(context) {
				expect(context).toEqual({ ctx: "test" });
				return "no strings";
			},
		});

		expect(result).toBe("no strings");
	});

	it("returns empty string when array is not an array", () => {
		const isString = (value: unknown) => typeof value === "string";

		const result = someFn.call({}, "not array", isString, {
			fn() {
				return "found";
			},
		});

		expect(result).toBe("");
	});

	it("returns empty string when iter is not a function", () => {
		const result = someFn.call({}, [1, 2, 3], "not function" as never, {
			fn() {
				return "found";
			},
		});

		expect(result).toBe("");
	});

	it("returns empty string when options is not provided", () => {
		const isString = (value: unknown) => typeof value === "string";
		const result = someFn.call({}, [1, "b", 3], isString, undefined);
		expect(result).toBe("");
	});

	it("returns inverse when provided and condition not met", () => {
		const isString = (value: unknown) => typeof value === "string";

		const result = someFn.call({}, [1, 2, 3], isString, {
			inverse() {
				return "no match";
			},
		});

		expect(result).toBe("no match");
	});

	it("returns empty string when no match and no inverse", () => {
		const isString = (value: unknown) => typeof value === "string";

		const result = someFn.call({}, [1, 2, 3], isString, {
			fn() {
				return "found";
			},
		});

		expect(result).toBe("");
	});

	it("returns empty string when match but no fn", () => {
		const isString = (value: unknown) => typeof value === "string";

		const result = someFn.call({}, [1, "b", 3], isString, {});
		expect(result).toBe("");
	});

	it("works with direct function call instead of Handlebars", () => {
		// Note: The 'some' helper expects a function parameter which is difficult
		// to pass through Handlebars templates directly. Testing with direct calls.
		const isString = (value: unknown) => typeof value === "string";

		const hasStringResult = someFn.call({}, [1, "b", 3], isString, {
			fn() {
				return "  has string";
			},
			inverse() {
				return "  no strings";
			},
		});

		const noStringResult = someFn.call({}, [1, 2, 3], isString, {
			fn() {
				return "  has string";
			},
			inverse() {
				return "  no strings";
			},
		});

		expect(hasStringResult).toBe("  has string");
		expect(noStringResult).toBe("  no strings");
	});
});

describe("eachIndex", () => {
	type EachIndexHelper = (
		this: unknown,
		array: unknown,
		options?: BlockHelperOptions,
	) => string;

	const eachIndexFn = getHelper("eachIndex") as EachIndexHelper;

	it("iterates array with item and index", () => {
		const contexts: Array<{ item: unknown; index: number }> = [];

		const result = eachIndexFn.call({}, ["a", "b", "c"], {
			fn(context) {
				const ctx = context as { item: string; index: number };
				contexts.push({ item: ctx.item, index: ctx.index });
				return `${ctx.item}:${ctx.index} `;
			},
		});

		expect(result).toBe("a:0 b:1 c:2 ");
		expect(contexts).toEqual([
			{ item: "a", index: 0 },
			{ item: "b", index: 1 },
			{ item: "c", index: 2 },
		]);
	});

	it("returns empty string for non-arrays", () => {
		const result = eachIndexFn.call({}, "not array", {
			fn() {
				throw new Error("should not run");
			},
		});

		expect(result).toBe("");
	});

	it("returns empty string when options is not provided", () => {
		const result = eachIndexFn.call({}, ["a", "b"], undefined);
		expect(result).toBe("");
	});

	it("returns empty string when fn is not provided", () => {
		const result = eachIndexFn.call({}, ["a", "b"], {});
		expect(result).toBe("");
	});

	it("renders inverse block for empty arrays", () => {
		const result = eachIndexFn.call({ ctx: "test" }, [], {
			fn() {
				throw new Error("should not run");
			},
			inverse(context) {
				expect(context).toEqual({ ctx: "test" });
				return "empty";
			},
		});

		expect(result).toBe("empty");
	});

	it("returns empty string for empty arrays without inverse", () => {
		const result = eachIndexFn.call({}, [], {
			fn() {
				return "should not run";
			},
		});

		expect(result).toBe("");
	});

	it("returns inverse result when provided and undefined is returned", () => {
		const result = eachIndexFn.call({}, [], {
			inverse() {
				return undefined;
			},
		});

		expect(result).toBe("");
	});

	it("returns inverse for non-arrays when provided", () => {
		const result = eachIndexFn.call({}, "not array", {
			fn() {
				return "should not run";
			},
			inverse() {
				return "not an array";
			},
		});

		expect(result).toBe("not an array");
	});

	it("works with Handlebars markup template", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#eachIndex array}}" + "  {{item}} is {{index}}" + "{{/eachIndex}}",
		);

		const result = template({ array: ["a", "b", "c", "d"] });
		expect(result).toBe("  a is 0  b is 1  c is 2  d is 3");
	});

	it("works with Handlebars markup template with else block", () => {
		const handlebars = fumanchu();
		const template = handlebars.compile(
			"{{#eachIndex array}}" +
				"{{item}}" +
				"{{else}}" +
				"empty array" +
				"{{/eachIndex}}",
		);

		expect(template({ array: ["x", "y"] })).toBe("xy");
		expect(template({ array: [] })).toBe("empty array");
	});
});
