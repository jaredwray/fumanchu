import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/string.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("append", () => {
	const fn = getHelper("append");
	it("appends suffix", () => {
		expect(fn("foo", "bar")).toBe("foobar");
	});
	it("returns original when not strings", () => {
		expect(fn(1 as unknown, "bar")).toBe(1 as unknown);
	});
	it("returns original when suffix not string", () => {
		expect(fn("foo", 1 as unknown)).toBe("foo");
	});
});

describe("camelcase", () => {
	const fn = getHelper("camelcase");
	it("camelcases string", () => {
		expect(fn("foo bar baz")).toBe("fooBarBaz");
	});
	it("returns empty for non-string", () => {
		expect(fn(null)).toBe("");
	});
	it("handles single character", () => {
		expect(fn("A")).toBe("a");
	});
});

describe("capitalize", () => {
	const fn = getHelper("capitalize");
	it("capitalizes first letter", () => {
		expect(fn("foo")).toBe("Foo");
	});
	it("returns empty for non-string", () => {
		expect(fn(null)).toBe("");
	});
});

describe("capitalizeAll", () => {
	const fn = getHelper("capitalizeAll");
	it("capitalizes all words", () => {
		expect(fn("foo bar")).toBe("Foo Bar");
	});
	it("returns empty for non-string", () => {
		expect(fn(undefined)).toBe("");
	});
});

describe("center", () => {
	const fn = getHelper("center");
	it("centers string", () => {
		expect(fn("foo", 2)).toBe("&nbsp;&nbsp;foo&nbsp;&nbsp;");
	});
	it("returns empty for non-string", () => {
		expect(fn(null, 2)).toBe("");
	});
	it("handles zero spaces", () => {
		expect(fn("foo", 0)).toBe("foo");
	});
});

describe("chop", () => {
	const fn = getHelper("chop");
	it("chops non-word chars", () => {
		expect(fn("_foo_")).toBe("foo");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("dashcase", () => {
	const fn = getHelper("dashcase");
	it("dashcases string", () => {
		expect(fn("a b_c")).toBe("a-b-c");
	});
	it("returns empty for non-string", () => {
		expect(fn({} as unknown)).toBe("");
	});
});

describe("dotcase", () => {
	const fn = getHelper("dotcase");
	it("dotcases string", () => {
		expect(fn("a b_c")).toBe("a.b.c");
	});
	it("returns empty for non-string", () => {
		expect(fn(true as unknown)).toBe("");
	});
});

describe("ellipsis", () => {
	const fn = getHelper("ellipsis");
	it("returns string when shorter", () => {
		expect(fn("foo", 5)).toBe("foo");
	});
	it("adds ellipsis when longer", () => {
		expect(fn("foobar", 3)).toBe("foo…");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown, 2)).toBe("");
	});
});

describe("hyphenate", () => {
	const fn = getHelper("hyphenate");
	it("replaces spaces with hyphen", () => {
		expect(fn("foo bar")).toBe("foo-bar");
	});
	it("returns empty for non-string", () => {
		expect(fn(5 as unknown)).toBe("");
	});
});

describe("isString", () => {
	const fn = getHelper("isString");
	it("detects strings", () => {
		expect(fn("foo")).toBe(true);
		expect(fn(1)).toBe(false);
	});
});

describe("lowercase", () => {
	const fn = getHelper("lowercase");
	it("lowercases string", () => {
		expect(fn("FOO")).toBe("foo");
	});
	it("handles block options", () => {
		expect(fn({ fn: () => "BAR" })).toBe("bar");
	});
	it("returns empty for non-string", () => {
		expect(fn(1 as unknown)).toBe("");
	});
});

describe("downcase", () => {
	const fn = getHelper("downcase");
	it("aliases lowercase", () => {
		expect(fn("FOO")).toBe("foo");
	});
});

describe("occurrences", () => {
	const fn = getHelper("occurrences");
	it("counts substring", () => {
		expect(fn("foo bar foo", "foo")).toBe(2);
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown, "a")).toBe("");
	});
});

describe("pascalcase", () => {
	const fn = getHelper("pascalcase");
	it("pascalcases string", () => {
		expect(fn("foo bar")).toBe("FooBar");
	});
	it("returns empty for non-string", () => {
		expect(fn(null)).toBe("");
	});
});

describe("pathcase", () => {
	const fn = getHelper("pathcase");
	it("pathcases string", () => {
		expect(fn("a b_c")).toBe("a/b/c");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("plusify", () => {
	const fn = getHelper("plusify");
	it("replaces spaces with plus", () => {
		expect(fn("foo bar")).toBe("foo+bar");
	});
	it("uses custom char", () => {
		expect(fn("foo-bar", "-")).toBe("foo+bar");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("prepend", () => {
	const fn = getHelper("prepend");
	it("prepends string", () => {
		expect(fn("bar", "foo-")).toBe("foo-bar");
	});
	it("returns original when invalid", () => {
		expect(fn(5 as unknown, "foo")).toBe(5 as unknown);
	});
	it("returns original when prefix invalid", () => {
		expect(fn("bar", 1 as unknown)).toBe("bar");
	});
});

describe("remove", () => {
	const fn = getHelper("remove");
	it("removes substring", () => {
		expect(fn("a b a", "a ")).toBe("b a");
	});
	it("returns str when ch missing", () => {
		expect(fn("abc", 1 as unknown)).toBe("abc");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown, "a")).toBe("");
	});
});

describe("removeFirst", () => {
	const fn = getHelper("removeFirst");
	it("removes first occurrence", () => {
		expect(fn("a a a", "a")).toBe(" a a");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown, "a")).toBe("");
	});
	it("returns str when ch not string", () => {
		expect(fn("abc", 1 as unknown)).toBe("abc");
	});
});

describe("replace", () => {
	const fn = getHelper("replace");
	it("replaces all occurrences", () => {
		expect(fn("a a", "a", "b")).toBe("b b");
	});
	it("handles missing b", () => {
		expect(fn("a a", "a")).toBe(" ");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown, "a", "b")).toBe("");
	});
	it("returns str when a not string", () => {
		expect(fn("a", 2 as unknown, "b")).toBe("a");
	});
});

describe("replaceFirst", () => {
	const fn = getHelper("replaceFirst");
	it("replaces first occurrence", () => {
		expect(fn("a a", "a", "b")).toBe("b a");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown, "a", "b")).toBe("");
	});
	it("returns str when a not string", () => {
		expect(fn("a", 2 as unknown, "b")).toBe("a");
	});
	it("handles missing b", () => {
		expect(fn("a a", "a")).toBe(" a");
	});
});

describe("reverse", () => {
	const fn = getHelper("reverse");
	it("reverses string", () => {
		expect(fn("abc")).toBe("cba");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("sentence", () => {
	const fn = getHelper("sentence");
	it("sentence cases text", () => {
		expect(fn("hello world. goodbye world.")).toBe(
			"Hello world. Goodbye world.",
		);
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("snakecase", () => {
	const fn = getHelper("snakecase");
	it("snakecases string", () => {
		expect(fn("a b-c")).toBe("a_b_c");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("trim", () => {
	const fn = getHelper("trim");
	it("trims string", () => {
		expect(fn("  foo  ")).toBe("foo");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("trimLeft", () => {
	const fn = getHelper("trimLeft");
	it("trims left", () => {
		expect(fn("  foo")).toBe("foo");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("trimRight", () => {
	const fn = getHelper("trimRight");
	it("trims right", () => {
		expect(fn("foo  ")).toBe("foo");
	});
	it("returns empty for non-string", () => {
		expect(fn(false as unknown)).toBe("");
	});
});

describe("truncate", () => {
	const fn = getHelper("truncate");
	it("truncates with suffix", () => {
		expect(fn("foobar", 5, "...")).toBe("fo...");
	});
	it("returns str when shorter", () => {
		expect(fn("foo", 5)).toBe("foo");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown, 2)).toBe("");
	});
});

describe("truncateWords", () => {
	const fn = getHelper("truncateWords");
	it("truncates words", () => {
		expect(fn("foo bar baz", 2)).toBe("foo bar...");
	});
	it("returns empty for invalid args", () => {
		expect(fn("foo", "x" as unknown as number)).toBe("");
	});
});

describe("uppercase", () => {
	const fn = getHelper("uppercase");
	it("uppercases string", () => {
		expect(fn("foo")).toBe("FOO");
	});
	it("handles block", () => {
		expect(fn({ fn: () => "bar" })).toBe("BAR");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});

describe("upcase", () => {
	const fn = getHelper("upcase");
	it("aliases uppercase", () => {
		expect(fn("foo")).toBe("FOO");
	});
	it("returns empty for non-string", () => {
		expect(fn(123 as unknown)).toBe("");
	});
});
