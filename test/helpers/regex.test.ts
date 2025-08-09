import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/regex.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

const toRegexFn = getHelper("toRegex");
const testFn = getHelper("test");

describe("toRegex", () => {
	it("creates a regular expression from a string", () => {
		const result = toRegexFn("foo") as RegExp;
		expect(result).toBeInstanceOf(RegExp);
		expect(result.source).toBe("foo");
	});
	it("accepts flags", () => {
		const result = toRegexFn("foo", { flags: "i" }) as RegExp;
		expect(result.flags).toBe("i");
	});
});

describe("test", () => {
	it("returns false for non-string input", () => {
		expect(testFn(123, /foo/)).toBe(false);
	});
	it("throws when regex is not a RegExp", () => {
		// biome-ignore lint/suspicious/noExplicitAny: testing invalid input
		expect(() => testFn("foo", "bar" as any)).toThrow(
			"expected a regular expression",
		);
	});
	it("tests a string against a regex", () => {
		const regex = toRegexFn("foo") as RegExp;
		expect(testFn("foobar", regex)).toBe(true);
		expect(testFn("bar", regex)).toBe(false);
	});
});
