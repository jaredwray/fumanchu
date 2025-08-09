import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/object.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("extend", () => {
	const extendFn = getHelper("extend");
	it("merges objects", () => {
		expect(extendFn({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
	});
	it("handles options hash", () => {
		expect(extendFn({ a: 1 }, { b: 2 }, { hash: { c: 3 } })).toEqual({
			a: 1,
			b: 2,
			c: 3,
		});
	});
	it("ignores non-objects", () => {
		expect(extendFn({ a: 1 }, "nope", { hash: { b: 2 } })).toEqual({
			a: 1,
			b: 2,
		});
	});
});

describe("forIn", () => {
	const forInFn = getHelper("forIn");
	it("iterates all enumerable properties", () => {
		const proto = { p: 1 };
		const obj = Object.create(proto);
		obj.a = 2;
		const calls: string[] = [];
		const res = forInFn(obj, {
			hash: {},
			fn: (val: unknown, { data }: { data: { key: string } }) => {
				calls.push(`${data.key}:${String(val)}`);
				return "";
			},
			inverse: () => "inv",
		});
		expect(res).toBe("");
		expect(calls).toContain("a:2");
		expect(calls).toContain("p:1");
	});
	it("handles undefined hash", () => {
		const obj = { a: 1 };
		const calls: string[] = [];
		forInFn(obj, {
			hash: undefined,
			fn: (val: unknown, { data }: { data: { key: string } }) => {
				calls.push(`${data.key}:${String(val)}`);
				return "";
			},
			inverse: () => "inv",
		} as unknown as {
			hash: undefined;
			fn: (val: unknown, ctx: { data: { key: string } }) => string;
			inverse: () => string;
		});
		expect(calls).toEqual(["a:1"]);
	});
	it("uses inverse when options invalid", () => {
		const res = forInFn({ a: 1 }, { inverse: () => "nope" } as unknown as {
			inverse: () => string;
		});
		expect(res).toBe("nope");
	});
	it("returns empty string when inverse missing", () => {
		const res = forInFn({ a: 1 }, {} as unknown as Record<string, unknown>);
		expect(res).toBe("");
	});
});

describe("forOwn", () => {
	const forOwnFn = getHelper("forOwn");
	it("iterates own properties only", () => {
		const proto = { p: 1 };
		const obj = Object.create(proto);
		obj.a = 2;
		const calls: string[] = [];
		forOwnFn(obj, {
			hash: {},
			fn: (val: unknown, { data }: { data: { key: string } }) => {
				calls.push(`${data.key}:${String(val)}`);
				return "";
			},
			inverse: () => "inv",
		});
		expect(calls).toEqual(["a:2"]);
	});
	it("handles undefined hash", () => {
		const obj = { a: 1 };
		const calls: string[] = [];
		forOwnFn(obj, {
			hash: undefined,
			fn: (val: unknown, { data }: { data: { key: string } }) => {
				calls.push(`${data.key}:${String(val)}`);
				return "";
			},
			inverse: () => "inv",
		} as unknown as {
			hash: undefined;
			fn: (val: unknown, ctx: { data: { key: string } }) => string;
			inverse: () => string;
		});
		expect(calls).toEqual(["a:1"]);
	});
	it("uses inverse when options invalid", () => {
		const res = forOwnFn({ a: 1 }, { inverse: () => "none" } as unknown as {
			inverse: () => string;
		});
		expect(res).toBe("none");
	});
	it("returns empty string when inverse missing", () => {
		const res = forOwnFn({ a: 1 }, {} as unknown as Record<string, unknown>);
		expect(res).toBe("");
	});
});

describe("toPath", () => {
	const toPathFn = getHelper("toPath");
	it("joins path segments", () => {
		expect(toPathFn("a", "b", 1)).toBe("a.b.1");
	});
	it("ignores non-string segments", () => {
		expect(toPathFn("a", { foo: 1 }, 2)).toBe("a.2");
	});
});

describe("get", () => {
	const getFn = getHelper("get");
	const context = { a: { b: 2 } };
	it("retrieves value", () => {
		expect(getFn("a.b", context)).toBe(2);
	});
	it("uses block helper when value exists", () => {
		const res = getFn("a.b", context, {
			fn: (v: number) => v * 2,
			inverse: () => "none",
		});
		expect(res).toBe(4);
	});
	it("uses inverse when value missing", () => {
		const res = getFn("a.c", context, {
			fn: (v: unknown) => v,
			inverse: () => "missing",
		});
		expect(res).toBe("missing");
	});
});

describe("getObject", () => {
	const getObjectFn = getHelper("getObject");
	it("returns object at path", () => {
		expect(getObjectFn("a.b", { a: { b: 2 } })).toEqual({ b: 2 });
	});
});

describe("hasOwn", () => {
	const hasOwnFn = getHelper("hasOwn");
	it("checks own property", () => {
		const obj = Object.create({ a: 1 });
		obj.b = 2;
		expect(hasOwnFn(obj, "b")).toBe(true);
		expect(hasOwnFn(obj, "a")).toBe(false);
	});
});

describe("isObject", () => {
	const isObjectFn = getHelper("isObject");
	it("detects objects", () => {
		expect(isObjectFn({})).toBe(true);
		expect(isObjectFn([])).toBe(false);
	});
});

describe("JSONparse", () => {
	const parseFn = getHelper("JSONparse");
	it("parses JSON", () => {
		expect(parseFn('{"a":1}')).toEqual({ a: 1 });
	});
});

describe("JSONstringify", () => {
	const stringifyFn = getHelper("JSONstringify");
	it("stringifies without indent", () => {
		expect(stringifyFn({ a: 1 })).toBe('{"a":1}');
	});
	it("stringifies with indent", () => {
		expect(stringifyFn({ a: 1 }, 2)).toBe(`{
  "a": 1
}`);
	});
});

describe("merge", () => {
	const mergeFn = getHelper("merge");
	it("merges objects and options hash", () => {
		const target = { a: 1 };
		const res = mergeFn(target, { b: 2 }, { hash: { c: 3 } });
		expect(res).toEqual({ a: 1, b: 2, c: 3 });
		expect(target).toEqual({ a: 1, b: 2, c: 3 });
	});
	it("merges without options", () => {
		const target = { a: 1 };
		mergeFn(target, { b: 2 });
		expect(target).toEqual({ a: 1, b: 2 });
	});
});

describe("parseJSON alias", () => {
	const parseJSONFn = getHelper("parseJSON");
	it("works like JSONparse", () => {
		expect(parseJSONFn('{"a":1}')).toEqual({ a: 1 });
	});
});

describe("pick", () => {
	const pickFn = getHelper("pick");
	const ctx = { a: 1, b: 2, c: 3 };
	it("picks properties", () => {
		expect(pickFn(["a", "c"], ctx)).toEqual({ a: 1, c: 3 });
	});
	it("block helper with found props", () => {
		const res = pickFn("a", ctx, {
			fn: (v: Record<string, number>) => v.a,
			inverse: () => "none",
		});
		expect(res).toBe(1);
	});
	it("block helper with missing props", () => {
		const res = pickFn("d", ctx, {
			fn: (v: Record<string, unknown>) => (v as { d?: unknown }).d,
			inverse: () => "missing",
		});
		expect(res).toBe("missing");
	});
});

describe("stringify alias", () => {
	const stringifyAlias = getHelper("stringify");
	it("works like JSONstringify", () => {
		expect(stringifyAlias({ a: 1 })).toBe('{"a":1}');
	});
});
