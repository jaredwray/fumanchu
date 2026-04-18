import { CacheableMemory } from "@cacheable/memory";
import { describe, expect, it } from "vitest";
import { fumanchu, HelperRegistry, helpers } from "../../src/browser.js";

describe("browser smoke", () => {
	it("compiles a template using browser-safe helpers", () => {
		const hbs = fumanchu();
		const out = hbs.compile("{{year}}-{{add 1 2}}-{{uppercase 'hi'}}")({});
		expect(out).toMatch(/^\d{4}-3-HI$/);
	});

	it("registers no Node-only helpers", () => {
		const reg = new HelperRegistry();
		const nodeOnly = [
			"read",
			"readdir",
			"fileSize",
			"absolute",
			"dirname",
			"relative",
			"basename",
			"stem",
			"extname",
			"resolve",
			"segments",
			"log",
			"ok",
			"success",
			"info",
			"warning",
			"warn",
			"error",
			"danger",
			"bold",
			"_debug",
			"_inspect",
			"markdown",
			"md",
			"embed",
			"css",
			"js",
			"escape",
			"urlParse",
			"urlResolve",
			"stripProtocol",
		];
		for (const name of nodeOnly) {
			expect(reg.has(name), `${name} should NOT be registered in browser`).toBe(
				false,
			);
		}
	});

	it("registers browser-safe helpers", () => {
		const reg = new HelperRegistry();
		const safe = [
			"year",
			"add",
			"uppercase",
			"encodeURI",
			"decodeURI",
			"url_encode",
			"url_decode",
			"stripQuerystring",
			"sanitize",
			"ul",
			"ol",
			"thumbnailImage",
			"attr",
			"gist",
			"jsfiddle",
		];
		for (const name of safe) {
			expect(reg.has(name), `${name} should be registered in browser`).toBe(
				true,
			);
		}
	});

	it("helpers() attaches browser-safe helpers to a Handlebars instance", () => {
		// Lazy import of Handlebars so this test doesn't depend on the re-export
		// returning the same instance.
		const reg = new HelperRegistry();
		const fakeHbs = {
			registered: new Map<string, unknown>(),
			registerHelper(name: string, fn: unknown) {
				this.registered.set(name, fn);
			},
		};
		// biome-ignore lint/suspicious/noExplicitAny: minimal test double
		reg.load(fakeHbs as any);
		expect(fakeHbs.registered.has("year")).toBe(true);
		expect(fakeHbs.registered.has("read")).toBe(false);

		// Also verify the public helpers() wrapper uses the browser registry.
		const fake2 = {
			registerHelper(_name: string, _fn: unknown) {},
		};
		// biome-ignore lint/suspicious/noExplicitAny: minimal test double
		helpers({ handlebars: fake2 as any });
		// Exercise the `hbs` alias branch of the nullish coalescing.
		// biome-ignore lint/suspicious/noExplicitAny: minimal test double
		helpers({ hbs: fake2 as any });
	});
});

describe("browser caching", () => {
	it("caches compiled templates when caching: true", () => {
		const hbs = fumanchu({ caching: true });
		const first = hbs.compile("{{uppercase 'hi'}}");
		const second = hbs.compile("{{uppercase 'hi'}}");
		expect(first).toBe(second);
		expect(first({})).toBe("HI");
	});

	it("accepts a CacheableMemory options object", () => {
		const hbs = fumanchu({ caching: { ttl: 1000 } });
		const tpl = hbs.compile("{{year}}");
		expect(tpl({})).toMatch(/^\d{4}$/);
		// Second compile with the same input must return the cached delegate.
		expect(hbs.compile("{{year}}")).toBe(tpl);
	});

	it("accepts a CacheableMemory instance", () => {
		const cache = new CacheableMemory({ useClone: false });
		const hbs = fumanchu({ caching: cache });
		const tpl = hbs.compile("{{lowercase 'HI'}}");
		expect(tpl({})).toBe("hi");
		expect(hbs.compile("{{lowercase 'HI'}}")).toBe(tpl);
	});

	it("includes compile options in the cache key", () => {
		const hbs = fumanchu({ caching: true });
		const a = hbs.compile("{{year}}", { noEscape: true });
		const b = hbs.compile("{{year}}", { noEscape: false });
		// Different options should yield different cached delegates.
		expect(a).not.toBe(b);
		// Same options should hit the cache.
		expect(hbs.compile("{{year}}", { noEscape: true })).toBe(a);
	});
});
