import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/collection.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("isEmpty", () => {
	const isEmptyFn = getHelper("isEmpty");
	it("returns true for empty array", () => {
		expect(isEmptyFn([])).toBe(true);
	});
	it("returns true when no value is provided", () => {
		expect(isEmptyFn()).toBe(true);
	});
	it("returns false for non-empty array", () => {
		expect(isEmptyFn([1])).toBe(false);
	});
	it("returns false for non-empty object", () => {
		expect(isEmptyFn({ foo: "bar" })).toBe(false);
	});
	it("returns true for empty object", () => {
		expect(isEmptyFn({})).toBe(true);
	});
});

describe("iterate", () => {
	const iterateFn = getHelper("iterate");
	it("iterates over an object", () => {
		const obj = { a: "aaa", b: "bbb", c: "ccc" };
		expect(iterateFn(obj, (v) => v)).toBe("aaabbbccc");
	});
	it("exposes keys for object iteration", () => {
		const obj = { a: "aaa", b: "bbb", c: "ccc" };
		expect(iterateFn(obj, (_v, key) => key)).toBe("abc");
	});
	it("iterates over an array", () => {
		const arr = [{ name: "a" }, { name: "b" }, { name: "c" }];
		expect(iterateFn(arr, (v) => v.name)).toBe("abc");
	});
	it("exposes index for arrays", () => {
		const arr = [{ name: "a" }, { name: "b" }, { name: "c" }];
		expect(iterateFn(arr, (_v, idx) => String(idx))).toBe("012");
	});
	it("returns inverse result for falsey collections", () => {
		expect(
			iterateFn(
				undefined,
				() => "A",
				() => "B",
			),
		).toBe("B");
	});
});
