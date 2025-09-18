import { describe, expect, it } from "vitest";
import type { ForEachOptions } from "../../src/helpers/array.js";
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
	});
});
