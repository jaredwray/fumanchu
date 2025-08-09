import { describe, expect, it, vi } from "vitest";
import { helpers } from "../../src/helpers/math.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("abs", () => {
	const fn = getHelper("abs");
	it("returns magnitude", () => {
		expect(fn(-5)).toBe(5);
	});
	it("throws on non-number", () => {
		expect(() => fn("a")).toThrow(/expected a number/);
	});
});

describe("add", () => {
	const fn = getHelper("add");
	it("adds numeric values", () => {
		expect(fn(5, 5)).toBe(10);
		expect(fn("5", "5")).toBe(10);
	});
	it("returns empty string when invalid", () => {
		expect(fn("a", 2)).toBe("");
	});
});

describe("avg", () => {
	const fn = getHelper("avg");
	it("averages numbers", () => {
		expect(fn(1, 2, 3, 4)).toBe(2.5);
	});
	it("averages arrays", () => {
		expect(fn([1, 3, 6, 9])).toBe(4.75);
	});
});

describe("ceil", () => {
	const fn = getHelper("ceil");
	it("rounds up", () => {
		expect(fn(5.1)).toBe(6);
	});
	it("throws on non-number", () => {
		expect(() => fn("a")).toThrow();
	});
});

describe("divide", () => {
	const fn = getHelper("divide");
	it("divides numbers", () => {
		expect(fn(10, 2)).toBe(5);
	});
	it("throws on invalid arguments", () => {
		expect(() => fn("a", 2)).toThrow();
		expect(() => fn(2, "b")).toThrow();
	});
});

describe("floor", () => {
	const fn = getHelper("floor");
	it("rounds down", () => {
		expect(fn(5.9)).toBe(5);
	});
	it("throws on non-number", () => {
		expect(() => fn("a")).toThrow();
	});
});

describe("minus", () => {
	const fn = getHelper("minus");
	it("subtracts numbers", () => {
		expect(fn(10, 3)).toBe(7);
	});
	it("throws on invalid arguments", () => {
		expect(() => fn("a", 2)).toThrow();
		expect(() => fn(2, "b")).toThrow();
	});
});

describe("modulo", () => {
	const fn = getHelper("modulo");
	it("returns modulo", () => {
		expect(fn(10, 3)).toBe(1);
	});
	it("throws on invalid arguments", () => {
		expect(() => fn("a", 2)).toThrow();
		expect(() => fn(2, "b")).toThrow();
	});
});

describe("multiply", () => {
	const fn = getHelper("multiply");
	it("multiplies numbers", () => {
		expect(fn(5, 5)).toBe(25);
	});
	it("throws on invalid arguments", () => {
		expect(() => fn("a", 2)).toThrow();
		expect(() => fn(2, "b")).toThrow();
	});
});

describe("plus", () => {
	const fn = getHelper("plus");
	it("adds numbers", () => {
		expect(fn(5, 5)).toBe(10);
	});
	it("throws on invalid arguments", () => {
		expect(() => fn("a", 2)).toThrow();
		expect(() => fn(2, "b")).toThrow();
	});
});

describe("random", () => {
	const fn = getHelper("random");
	it("returns value in range", () => {
		vi.spyOn(Math, "random").mockReturnValue(0.5);
		expect(fn(1, 3)).toBe(2);
		vi.restoreAllMocks();
	});
	it("throws on invalid arguments", () => {
		expect(() => fn("a", 2)).toThrow();
		expect(() => fn(1, "b")).toThrow();
	});
});

describe("remainder", () => {
	const fn = getHelper("remainder");
	it("returns remainder", () => {
		expect(fn(7, 5)).toBe(2);
	});
});

describe("round", () => {
	const fn = getHelper("round");
	it("rounds", () => {
		expect(fn(5.5)).toBe(6);
	});
	it("throws on non-number", () => {
		expect(() => fn("a")).toThrow();
	});
});

describe("subtract", () => {
	const fn = getHelper("subtract");
	it("subtracts numbers", () => {
		expect(fn(5, 3)).toBe(2);
	});
	it("throws on invalid arguments", () => {
		expect(() => fn("a", 2)).toThrow();
		expect(() => fn(2, "b")).toThrow();
	});
});

describe("sum", () => {
	const fn = getHelper("sum");
	it("sums numbers", () => {
		expect(fn(1, 2, 3)).toBe(6);
	});
	it("sums arrays", () => {
		expect(fn([1, 2, 3], 4)).toBe(10);
	});
	it("ignores non-numeric", () => {
		expect(fn([1, "a", 2])).toBe(3);
	});
});

describe("times", () => {
	const fn = getHelper("times");
	it("multiplies numbers", () => {
		expect(fn(3, 4)).toBe(12);
	});
});
