import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/number.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("bytes", () => {
	const fn = getHelper("bytes");
	it("formats numbers", () => {
		expect(fn(13661855)).toBe("13.66 MB");
		expect(fn(825399)).toBe("825.4 kB");
		expect(fn(1396)).toBe("1.4 kB");
		expect(fn(0)).toBe("0 B");
		expect(fn(1)).toBe("1 B");
		expect(fn(2)).toBe("2 B");
	});
	it("uses precision", () => {
		expect(fn(1024, 0)).toBe("1 kB");
	});
	it("handles invalid values", () => {
		expect(fn({} as unknown as number)).toBe("0 B");
		expect(fn(undefined)).toBe("0 B");
	});
	it("uses string length", () => {
		expect(fn("foo")).toBe("3 B");
		expect(fn("foobar")).toBe("6 B");
		expect(fn("")).toBe("0 B");
	});
	it("uses object length", () => {
		expect(fn({ length: 5 })).toBe("5 B");
		expect(fn({ length: 0 })).toBe("0 B");
	});
	it("returns negative numbers", () => {
		expect(fn(-1)).toBe("-1");
	});
});

describe("phoneNumber", () => {
	const fn = getHelper("phoneNumber");
	it("formats phone numbers", () => {
		expect(fn("8005551212")).toBe("(800) 555-1212");
	});
});

describe("toFixed", () => {
	const fn = getHelper("toFixed");
	it("rounds", () => {
		expect(fn(5.53231)).toBe("6");
	});
	it("rounds with digits", () => {
		expect(fn(5.53231, 3)).toBe("5.532");
	});
	it("defaults when invalid", () => {
		expect(fn(undefined)).toBe("0");
	});
});

describe("toPrecision", () => {
	const fn = getHelper("toPrecision");
	it("returns exponential", () => {
		expect(fn(555.322)).toBe("6e+2");
	});
	it("returns fixed digits", () => {
		expect(fn(555.322, 4)).toBe("555.3");
	});
	it("handles invalid", () => {
		expect(fn(undefined)).toBe("0");
	});
});

describe("toExponential", () => {
	const fn = getHelper("toExponential");
	it("formats", () => {
		expect(fn(5)).toBe("5e+0");
	});
	it("formats with digits", () => {
		expect(fn(5, 5)).toBe("5.00000e+0");
	});
	it("handles invalid", () => {
		expect(fn(undefined)).toBe("0e+0");
	});
});

describe("toInt", () => {
	const fn = getHelper("toInt");
	it("parses int", () => {
		expect(fn("3cc")).toBe(3);
	});
});

describe("toFloat", () => {
	const fn = getHelper("toFloat");
	it("parses float", () => {
		expect(fn("3.1cc")).toBe(3.1);
	});
});

describe("addCommas", () => {
	const fn = getHelper("addCommas");
	it("adds commas", () => {
		expect(fn(2222222)).toBe("2,222,222");
	});
});

describe("toAbbr", () => {
	const fn = getHelper("toAbbr");
	it("abbreviates numbers", () => {
		expect(fn(123456789)).toBe("123.46m");
	});
	it("abbreviates with precision", () => {
		expect(fn(123456789, 3)).toBe("123.457m");
	});
	it("rounds up", () => {
		expect(fn(999)).toBe("1k");
	});
	it("handles big numbers", () => {
		expect(fn(9999999, 0)).toBe("10m");
		expect(fn(1000000000)).toBe("1b");
		expect(fn(1000000000000)).toBe("1t");
		expect(fn(1000000000000000)).toBe("1q");
		expect(fn(99393999393)).toBe("99.39b");
	});
	it("defaults when invalid", () => {
		expect(fn(undefined)).toBe("0");
	});
});
