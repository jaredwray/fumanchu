import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/inflection.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("inflect", () => {
	const inflectFn = getHelper("inflect");
	it("returns singular for count 1", () => {
		expect(inflectFn(1, "apple", "apples")).toBe("apple");
	});
	it("returns plural for count > 1", () => {
		expect(inflectFn(2, "apple", "apples")).toBe("apples");
	});
	it("returns plural for count 0", () => {
		expect(inflectFn(0, "apple", "apples")).toBe("apples");
	});
	it("includes the count when includeCount is true", () => {
		expect(inflectFn(2, "apple", "apples", true)).toBe("2 apples");
	});
});

describe("ordinalize", () => {
	const ordinalizeFn = getHelper("ordinalize");
	it("returns ordinalized strings", () => {
		expect(ordinalizeFn(1)).toBe("1st");
		expect(ordinalizeFn(2)).toBe("2nd");
		expect(ordinalizeFn(3)).toBe("3rd");
		expect(ordinalizeFn(4)).toBe("4th");
		expect(ordinalizeFn(11)).toBe("11th");
		expect(ordinalizeFn(21)).toBe("21st");
	});
});
