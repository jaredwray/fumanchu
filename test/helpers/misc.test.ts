// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context
// biome-ignore-all lint/correctness/noUnusedFunctionParameters: test functions may have unused params
// biome-ignore-all lint/complexity/noArguments: tests need to reference the arguments object
import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/misc.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("misc helpers", () => {
	describe("frame", () => {
		it("should include frame helper", () => {
			const frameFn = getHelper("frame");
			expect(typeof frameFn).toBe("function");
		});

		it("creates frame with hash variables", () => {
			const frameFn = getHelper("frame");
			const context = { name: "original" };
			const result = frameFn.call(context, {
				hash: { site: "test", value: 42 },
				fn: (ctx: any, opts: any) => {
					return `${opts.data.site}-${opts.data.value}`;
				},
			});
			expect(result).toBe("test-42");
		});

		it("passes context data to frame when provided with two arguments", () => {
			const frameFn = getHelper("frame");
			const context = { original: "data" };
			const contextData = { existing: "value" };
			const result = frameFn.call(context, contextData, {
				hash: { new: "item" },
				fn: (ctx: any, opts: any) => {
					return `${opts.data.new}`;
				},
			});
			expect(result).toBe("item");
		});

		it("handles context with hash property by reassigning parameters", () => {
			const frameFn = getHelper("frame");
			const context = { name: "test" };
			const result = frameFn.call(context, {
				hash: { variable: "value" },
				data: { existingData: "test" },
				fn: (ctx: any, opts: any) => {
					return opts.data.variable;
				},
			});
			expect(result).toBe("value");
		});

		it("works with null context", () => {
			const frameFn = getHelper("frame");
			const result = frameFn.call({}, null, {
				hash: { test: "value" },
				fn: (ctx: any, opts: any) => {
					return opts.data.test;
				},
			});
			expect(result).toBe("value");
		});

		it("handles undefined context", () => {
			const frameFn = getHelper("frame");
			const result = frameFn.call({}, undefined, {
				hash: { test: "value" },
				fn: (ctx: any, opts: any) => {
					return opts.data.test;
				},
			});
			expect(result).toBe("value");
		});

		it("handles null options object", () => {
			const frameFn = getHelper("frame");
			const context = { data: "test" };
			// When options is null, it should default to an empty object
			// Since options.fn won't exist, this will throw, so we expect an error
			expect(() => frameFn.call(context, context, null)).toThrow();
		});

		it("handles options without hash", () => {
			const frameFn = getHelper("frame");
			const context = { name: "test" };
			const result = frameFn.call(context, context, {
				fn: (ctx: any, opts: any) => {
					return "no-hash";
				},
			});
			expect(result).toBe("no-hash");
		});

		it("handles empty hash object", () => {
			const frameFn = getHelper("frame");
			const context = { name: "test" };
			const result = frameFn.call(context, {
				hash: {},
				fn: (ctx: any, opts: any) => {
					return "empty-hash";
				},
			});
			expect(result).toBe("empty-hash");
		});

		it("passes this context to fn correctly", () => {
			const frameFn = getHelper("frame");
			const context = { value: "thisContext" };
			const result = frameFn.call(context, context, {
				hash: { test: "data" },
				fn: (ctx: any, opts: any) => {
					// The first parameter ctx receives the 'this' value from frameFn.call
					return ctx.value;
				},
			});
			expect(result).toBe("thisContext");
		});

		it("merges multiple hash properties into frame", () => {
			const frameFn = getHelper("frame");
			const result = frameFn.call(
				{},
				{
					hash: { a: 1, b: 2, c: 3 },
					fn: (ctx: any, opts: any) => {
						return `${opts.data.a}-${opts.data.b}-${opts.data.c}`;
					},
				},
			);
			expect(result).toBe("1-2-3");
		});
	});

	it("option retrieves nested property", () => {
		const optionFn = getHelper("option");
		const context = { options: { a: { b: { c: "ddd" } } } };
		const result = optionFn.call(context, "a.b.c");
		expect(result).toBe("ddd");
	});

	it("noop returns block content", () => {
		const noopFn = getHelper("noop");
		const context = { value: "content" };
		const result = noopFn.call(context, {
			fn: (ctx: { value: string }) => ctx.value,
		});
		expect(result).toBe("content");
	});

	it("typeOf returns native type", () => {
		const typeOfFn = getHelper("typeOf");
		expect(typeOfFn(1)).toBe("number");
		expect(typeOfFn("1")).toBe("string");
	});

	describe("typeOf covers all native types", () => {
		const typeOfFn = getHelper("typeOf");

		it("identifies primitives", () => {
			expect(typeOfFn(undefined)).toBe("undefined");
			expect(typeOfFn(null)).toBe("null");
			expect(typeOfFn(true)).toBe("boolean");
			expect(typeOfFn(Symbol("s"))).toBe("symbol");
			expect(typeOfFn(BigInt(1))).toBe("bigint");
		});

		it("identifies date/error/regexp via structural shape", () => {
			const dateLike = {
				toDateString: () => "",
				getDate: () => 0,
				setDate: () => 0,
			};
			expect(typeOfFn(dateLike)).toBe("date");

			class CustomErr {
				message = "boom";
				static stackTraceLimit = 10;
			}
			expect(typeOfFn(new CustomErr())).toBe("error");

			const regexpLike = {
				flags: "",
				ignoreCase: false,
				multiline: false,
				global: false,
			};
			expect(typeOfFn(regexpLike)).toBe("regexp");
		});

		it("identifies functions and generator functions", () => {
			expect(typeOfFn(() => undefined)).toBe("function");
			function* gen() {
				yield 1;
			}
			expect(typeOfFn(gen)).toBe("generatorfunction");
			expect(typeOfFn(gen())).toBe("generator");
		});

		it("identifies arrays, buffers, arguments", () => {
			expect(typeOfFn([])).toBe("array");
			expect(typeOfFn(Buffer.from("x"))).toBe("buffer");
			(function argsCheck() {
				expect(typeOfFn(arguments)).toBe("arguments");
			})(1, 2);
		});

		it("identifies built-in objects", () => {
			expect(typeOfFn(new Date())).toBe("date");
			expect(typeOfFn(new Error("x"))).toBe("error");
			expect(typeOfFn(/re/)).toBe("regexp");
			expect(typeOfFn(Promise.resolve())).toBe("promise");
			expect(typeOfFn(new Map())).toBe("map");
			expect(typeOfFn(new Set())).toBe("set");
			expect(typeOfFn(new WeakMap())).toBe("weakmap");
			expect(typeOfFn(new WeakSet())).toBe("weakset");
		});

		it("identifies typed arrays", () => {
			expect(typeOfFn(new Int8Array())).toBe("int8array");
			expect(typeOfFn(new Uint8Array())).toBe("uint8array");
			expect(typeOfFn(new Uint8ClampedArray())).toBe("uint8clampedarray");
			expect(typeOfFn(new Int16Array())).toBe("int16array");
			expect(typeOfFn(new Uint16Array())).toBe("uint16array");
			expect(typeOfFn(new Int32Array())).toBe("int32array");
			expect(typeOfFn(new Uint32Array())).toBe("uint32array");
			expect(typeOfFn(new Float32Array())).toBe("float32array");
			expect(typeOfFn(new Float64Array())).toBe("float64array");
		});

		it("identifies iterators and plain objects", () => {
			expect(typeOfFn({})).toBe("object");
			expect(typeOfFn(new Map().entries())).toBe("mapiterator");
			expect(typeOfFn(new Set().values())).toBe("setiterator");
			expect(typeOfFn(""[Symbol.iterator]())).toBe("stringiterator");
			expect(typeOfFn([][Symbol.iterator]())).toBe("arrayiterator");
		});

		it("falls back to toString tag for exotic objects", () => {
			const arrayBufferType = typeOfFn(new ArrayBuffer(8));
			expect(arrayBufferType).toBe("arraybuffer");
		});
	});

	it("withHash uses hash when provided", () => {
		const withHashFn = getHelper("withHash");
		const result = withHashFn.call(
			{},
			{
				hash: { a: 1 },
				fn: (hash: { a: number }) => hash.a,
				inverse: () => "no",
			},
		);
		expect(result).toBe(1);
	});

	it("withHash falls back to inverse when hash empty", () => {
		const withHashFn = getHelper("withHash");
		const context = { value: "inv" };
		const result = withHashFn.call(context, {
			hash: {},
			fn: () => "yes",
			inverse: (ctx: { value: string }) => ctx.value,
		});
		expect(result).toBe("inv");
	});
});
