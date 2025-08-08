import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/comparison.js";

type HelperFn = (...args: unknown[]) => unknown;
const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("comparison helpers", () => {
	it("and/or", () => {
		const andFn = getHelper("and");
		const orFn = getHelper("or");
		expect(andFn(true, 1, "a")).toBe(true);
		expect(andFn(true, 0)).toBe(false);
		expect(orFn(false, 0, "yes")).toBe(true);
		expect(orFn(false, 0, "")).toBe(false);
	});

	it("compare", () => {
		const compareFn = getHelper("compare");
		expect(compareFn(1, "==", 1)).toBe(true);
		expect(compareFn(1, "===", 1)).toBe(true);
		expect(compareFn(1, "!=", 2)).toBe(true);
		expect(compareFn(1, "!==", 2)).toBe(true);
		expect(compareFn(1, "<", 2)).toBe(true);
		expect(compareFn(2, ">", 1)).toBe(true);
		expect(compareFn(1, "<=", 1)).toBe(true);
		expect(compareFn(2, ">=", 2)).toBe(true);
		expect(compareFn("hi", "typeof", "string")).toBe(true);
		expect(compareFn(1, "??", 2)).toBe(false);
	});

	it("contains/default", () => {
		const containsFn = getHelper("contains");
		const defaultFn = getHelper("default");
		expect(containsFn([1, 2, 3], 2)).toBe(true);
		expect(containsFn([1, 2, 3], 1, -3)).toBe(true);
		expect(containsFn("hello", "ell")).toBe(true);
		expect(containsFn("hello", "ell", -4)).toBe(true);
		expect(containsFn({ a: 1 }, "a")).toBe(true);
		expect(containsFn({ a: 1 }, "b")).toBe(false);
		expect(containsFn(5, "1")).toBe(false);
		expect(defaultFn(undefined, null, "x")).toBe("x");
		expect(defaultFn(undefined, null)).toBe("");
	});

	it("equality comparisons", () => {
		const eqFn = getHelper("eq");
		const gtFn = getHelper("gt");
		const gteFn = getHelper("gte");
		const ltFn = getHelper("lt");
		const lteFn = getHelper("lte");
		expect(eqFn(1, 1)).toBe(true);
		expect(gtFn(3, 2)).toBe(true);
		expect(gteFn(2, 2)).toBe(true);
		expect(ltFn(1, 2)).toBe(true);
		expect(lteFn(2, 2)).toBe(true);
	});

	it("has/isFalsey/isTruthy", () => {
		const hasFn = getHelper("has");
		const isFalseyFn = getHelper("isFalsey");
		const isTruthyFn = getHelper("isTruthy");
		expect(hasFn({ a: 1 }, "a")).toBe(true);
		expect(hasFn([1, 2], 2)).toBe(true);
		expect(hasFn("hello", "ell")).toBe(true);
		expect(hasFn(null)).toBe(false);
		expect(hasFn("hi")).toBe(true);
		expect(hasFn(5, "1")).toBe(false);
		expect(isFalseyFn(0)).toBe(true);
		expect(isFalseyFn(1)).toBe(false);
		expect(isTruthyFn("hi")).toBe(true);
		expect(isTruthyFn("")).toBe(false);
	});

	it("ifEven/ifOdd/ifNth", () => {
		const ifEvenFn = getHelper("ifEven");
		const ifOddFn = getHelper("ifOdd");
		const ifNthFn = getHelper("ifNth");
		expect(ifEvenFn(2)).toBe(true);
		expect(ifEvenFn(3)).toBe(false);
		expect(ifOddFn(3)).toBe(true);
		expect(ifOddFn(2)).toBe(false);
		expect(ifNthFn(2, 4)).toBe(true);
		expect(ifNthFn(2, 5)).toBe(false);
	});

	it("is/isnt", () => {
		const isFn = getHelper("is");
		const isntFn = getHelper("isnt");
		expect(isFn("1", 1)).toBe(true);
		expect(isFn("1", 2)).toBe(false);
		expect(isntFn(1, 2)).toBe(true);
		expect(isntFn(1, 1)).toBe(false);
	});

	it("logical helpers", () => {
		const neitherFn = getHelper("neither");
		const notFn = getHelper("not");
		const unlessEqFn = getHelper("unlessEq");
		const unlessGtFn = getHelper("unlessGt");
		const unlessLtFn = getHelper("unlessLt");
		const unlessGteqFn = getHelper("unlessGteq");
		const unlessLteqFn = getHelper("unlessLteq");
		expect(neitherFn(false, 0)).toBe(true);
		expect(neitherFn(true, 0)).toBe(false);
		expect(notFn(true)).toBe(false);
		expect(notFn(false)).toBe(true);
		expect(unlessEqFn(1, 2)).toBe(true);
		expect(unlessEqFn(1, 1)).toBe(false);
		expect(unlessGtFn(1, 2)).toBe(true);
		expect(unlessGtFn(3, 2)).toBe(false);
		expect(unlessLtFn(2, 1)).toBe(true);
		expect(unlessLtFn(1, 2)).toBe(false);
		expect(unlessGteqFn(1, 2)).toBe(true);
		expect(unlessGteqFn(2, 1)).toBe(false);
		expect(unlessLteqFn(2, 1)).toBe(true);
		expect(unlessLteqFn(1, 2)).toBe(false);
	});
});
