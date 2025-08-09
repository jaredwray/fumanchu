import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/misc.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("misc helpers", () => {
	it("should include frame helper", () => {
		const frameFn = getHelper("frame");
		expect(typeof frameFn).toBe("function");
	});

	it("option retrieves nested property", () => {
		const optionFn = getHelper("option");
		const context = { options: { a: { b: { c: "ddd" } } } };
		const result = optionFn.call(context, "a.b.c");
		expect(result).toBe("ddd");
	});

	it("noop returns block content", () => {
		const noopFn = getHelper("noop");
		const context = { value: "content" };
		const result = noopFn.call(context, {
			fn: (ctx: { value: string }) => ctx.value,
		});
		expect(result).toBe("content");
	});

	it("typeOf returns native type", () => {
		const typeOfFn = getHelper("typeOf");
		expect(typeOfFn(1)).toBe("number");
		expect(typeOfFn("1")).toBe("string");
	});

	it("withHash uses hash when provided", () => {
		const withHashFn = getHelper("withHash");
		const result = withHashFn.call(
			{},
			{
				hash: { a: 1 },
				fn: (hash: { a: number }) => hash.a,
				inverse: () => "no",
			},
		);
		expect(result).toBe(1);
	});

	it("withHash falls back to inverse when hash empty", () => {
		const withHashFn = getHelper("withHash");
		const context = { value: "inv" };
		const result = withHashFn.call(context, {
			hash: {},
			fn: () => "yes",
			inverse: (ctx: { value: string }) => ctx.value,
		});
		expect(result).toBe("inv");
	});
});
