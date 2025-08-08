import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/array.js";

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
