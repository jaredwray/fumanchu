import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/comparison.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("and", () => {
	const fn = getHelper("and");
	it("returns true when all values are truthy", () => {
		expect(fn(true, 1, "foo")).toBe(true);
	});
	it("returns false when any value is falsy", () => {
		expect(fn(true, 0, "foo")).toBe(false);
	});
});

describe("compare", () => {
	const fn = getHelper("compare");
	it("supports == operator", () => {
		expect(fn("5", "==", 5)).toBe(true);
	});
	it("supports >= operator", () => {
		expect(fn(3, ">=", 5)).toBe(false);
	});
});

describe("contains", () => {
	const fn = getHelper("contains");
	it("detects values in strings", () => {
		expect(fn("abc", "b")).toBe(true);
		expect(fn("abc", "z")).toBe(false);
	});
	it("detects values in arrays", () => {
		expect(fn([1, 2, 3], 2)).toBe(true);
		expect(fn([1, 2, 3], 4)).toBe(false);
	});
});

describe("default", () => {
	const fn = getHelper("default");
	it("returns first non-nullish value", () => {
		expect(fn(undefined, null, "a", "b")).toBe("a");
		expect(fn(undefined, null)).toBe("");
	});
});

describe("comparison basics", () => {
	it("eq", () => {
		const fn = getHelper("eq");
		expect(fn(1, 1)).toBe(true);
	});
	it("gt and gte", () => {
		const gt = getHelper("gt");
		const gte = getHelper("gte");
		expect(gt(5, 3)).toBe(true);
		expect(gte(3, 3)).toBe(true);
	});
	it("lt and lte", () => {
		const lt = getHelper("lt");
		const lte = getHelper("lte");
		expect(lt(1, 3)).toBe(true);
		expect(lte(3, 3)).toBe(true);
	});
});

describe("utility helpers", () => {
	it("has", () => {
		const fn = getHelper("has");
		expect(fn([1, 2, 3], 2)).toBe(true);
		expect(fn({ a: 1 }, "a")).toBe(true);
		expect(fn({ a: 1 }, "b")).toBe(false);
	});
	it("isFalsey/isTruthy", () => {
		const isFalsey = getHelper("isFalsey");
		const isTruthy = getHelper("isTruthy");
		expect(isFalsey(0)).toBe(true);
		expect(isTruthy(1)).toBe(true);
	});
	it("ifEven/ifOdd", () => {
		const ifEven = getHelper("ifEven");
		const ifOdd = getHelper("ifOdd");
		expect(ifEven(2)).toBe(true);
		expect(ifOdd(3)).toBe(true);
	});
	it("ifNth", () => {
		const ifNth = getHelper("ifNth");
		expect(ifNth(2, 4)).toBe(true);
		expect(ifNth(3, 4)).toBe(false);
	});
	it("is/isnt", () => {
		const is = getHelper("is");
		const isnt = getHelper("isnt");
		expect(is("1", 1)).toBe(true);
		expect(isnt("1", 1)).toBe(false);
	});
	it("neither", () => {
		const fn = getHelper("neither");
		expect(fn(false, 0)).toBe(true);
		expect(fn(true, 0)).toBe(false);
	});
	it("not", () => {
		const fn = getHelper("not");
		expect(fn(true)).toBe(false);
	});
	it("or", () => {
		const fn = getHelper("or");
		expect(fn(false, 0, "a")).toBe(true);
		expect(fn(false, 0, "")).toBe(false);
	});
	it("unless helpers", () => {
		const unlessEq = getHelper("unlessEq");
		const unlessGt = getHelper("unlessGt");
		const unlessLt = getHelper("unlessLt");
		const unlessGteq = getHelper("unlessGteq");
		const unlessLteq = getHelper("unlessLteq");
		expect(unlessEq(1, 2)).toBe(true);
		expect(unlessGt(1, 2)).toBe(true);
		expect(unlessLt(2, 1)).toBe(true);
		expect(unlessGteq(1, 2)).toBe(true);
		expect(unlessLteq(2, 1)).toBe(true);
	});
});
