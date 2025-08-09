import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/url.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("encodeURI", () => {
	const fn = getHelper("encodeURI");
	it("encodes URI components", () => {
		expect(fn("http://example.com?comment=Thyme &time=again")).toBe(
			"http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain",
		);
	});
	it("returns undefined for non-strings", () => {
		expect(fn(123)).toBeUndefined();
	});
});

describe("escape", () => {
	const fn = getHelper("escape");
	it("escapes a string", () => {
		expect(fn("http://example.com?comment=Thyme &time=again")).toBe(
			"http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain",
		);
	});
	it("returns undefined for non-strings", () => {
		expect(fn(123)).toBeUndefined();
	});
});

describe("decodeURI", () => {
	const fn = getHelper("decodeURI");
	it("decodes URI components", () => {
		expect(
			fn("http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain"),
		).toBe("http://example.com?comment=Thyme &time=again");
	});
	it("returns undefined for non-strings", () => {
		expect(fn(123)).toBeUndefined();
	});
});

describe("url_encode", () => {
	const fn = getHelper("url_encode");
	it("encodes using alias", () => {
		expect(fn("http://example.com?comment=Thyme &time=again")).toBe(
			"http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain",
		);
	});
});

describe("url_decode", () => {
	const fn = getHelper("url_decode");
	it("decodes using alias", () => {
		expect(
			fn("http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain"),
		).toBe("http://example.com?comment=Thyme &time=again");
	});
});

describe("urlResolve", () => {
	const fn = getHelper("urlResolve");
	it("resolves relative paths", () => {
		expect(fn("/one/two/three", "four")).toBe("/one/two/four");
		expect(fn("http://example.com/", "/one")).toBe("http://example.com/one");
	});
});

describe("urlParse", () => {
	const fn = getHelper("urlParse");
	it("parses a url into components", () => {
		expect(fn("http://foo.com/bar/baz?key=value")).toMatchObject({
			protocol: "http:",
			hostname: "foo.com",
			pathname: "/bar/baz",
			query: "key=value",
		});
	});
});

describe("stripQuerystring", () => {
	const fn = getHelper("stripQuerystring");
	it("strips query parameters", () => {
		expect(fn("http://example.com?tests=true")).toBe("http://example.com");
	});
	it("returns undefined for non-strings", () => {
		expect(fn(null)).toBeUndefined();
	});
});

describe("stripProtocol", () => {
	const fn = getHelper("stripProtocol");
	it("removes http/https protocols", () => {
		expect(fn("http://foo.bar")).toBe("//foo.bar/");
		expect(fn("https://foo.bar")).toBe("//foo.bar/");
	});
	it("returns undefined for non-strings", () => {
		expect(fn(123)).toBeUndefined();
	});
	it("leaves relative urls", () => {
		expect(fn("/path/to/file")).toBe("/path/to/file");
	});
});
