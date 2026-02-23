import Handlebars from "handlebars";
import { describe, expect, test } from "vitest";
import {
	CacheableMemory,
	createHandlebars,
	fumanchu,
	handlebars,
	helpers,
} from "../src/index.js";

describe("fumanchu", () => {
	test("should have helpers", () => {
		expect(helpers).toBeDefined();
	});

	test("can use handlebars and helpers", async () => {
		const hb = handlebars;
		expect(hb).toBeDefined();
		const result = hb.compile("{{year}}");
		expect(result({})).toBe("");
		// and in helpers
		helpers({ handlebars: hb });
		const result2 = hb.compile("{{year}}");
		expect(result2({})).toBe(new Date().getFullYear().toString());
	});

	test("should be able to createHandlebars", async () => {
		const handlebars = await createHandlebars();
		expect(handlebars).toBeDefined();
		const result = handlebars.compile("{{year}}");
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test("should be able to createHandlebars", async () => {
		const handlebars = await createHandlebars();
		expect(handlebars).toBeDefined();
		const year = new Date().getFullYear();
		const name = "Fumanchu";
		const result = handlebars.compile(
			"this is an amazing {{year}} for {{name}}",
		);

		expect(result({ name, year })).toBe(
			`this is an amazing ${year} for ${name}`,
		);
	});

	test("should be able to run fumanchu()", () => {
		const handlebars = fumanchu();
		expect(handlebars).toBeDefined();
		const result = handlebars.compile("{{year}}");
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test("should be able to set helpers", async () => {
		helpers({ handlebars });
		const result = handlebars.compile("{{year}}");
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test("registers helpers when using hbs alias", () => {
		const hbs = Handlebars.create();

		expect(hbs.helpers.year).toBeUndefined();

		helpers({ hbs });

		expect(typeof hbs.helpers.year).toBe("function");
		const template = hbs.compile("{{year}}");
		expect(template({})).toBe(new Date().getFullYear().toString());
	});

	test("fumanchu should include existing partials", () => {
		Handlebars.registerPartial("fumanchuPartial", "Hello {{name}}");
		try {
			const instance = fumanchu();
			const template = instance.compile("{{> fumanchuPartial}}");
			expect(template({ name: "World" })).toBe("Hello World");
		} finally {
			Handlebars.unregisterPartial("fumanchuPartial");
		}
	});

	test("should be able to do markdown", async () => {
		const handlebars = await createHandlebars();
		expect(handlebars).toBeDefined();
		const result = handlebars.compile('{{md "# Hello World"}}');
		expect(result({})).toBe("<h1>Hello World</h1>\n");
	});

	test("createHandlebars should include existing partials", async () => {
		Handlebars.registerPartial("fumanchuCreatePartial", "Hi {{name}}");
		try {
			const instance = await createHandlebars();
			const template = instance.compile("{{> fumanchuCreatePartial}}");
			expect(template({ name: "World" })).toBe("Hi World");
		} finally {
			Handlebars.unregisterPartial("fumanchuCreatePartial");
		}
	});

	test("should export CacheableMemory", () => {
		expect(CacheableMemory).toBeDefined();
	});
});

describe("fumanchu caching", () => {
	test("should accept caching as boolean", () => {
		const hbs = fumanchu({ caching: true });
		expect(hbs).toBeDefined();
		const result = hbs.compile("{{year}}");
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test("should accept caching as CacheableMemory instance", () => {
		const cache = new CacheableMemory({
			ttl: "1h",
			lruSize: 100,
			useClone: false,
		});
		const hbs = fumanchu({ caching: cache });
		expect(hbs).toBeDefined();
		const result = hbs.compile("{{year}}");
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test("should accept caching as CacheableMemoryOptions", () => {
		const hbs = fumanchu({ caching: { ttl: 1000 } });
		expect(hbs).toBeDefined();
		const result = hbs.compile("{{year}}");
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test("caching returns same compiled function for same template", () => {
		const hbs = fumanchu({ caching: true });
		const first = hbs.compile("{{year}}");
		const second = hbs.compile("{{year}}");
		expect(first).toBe(second);
	});

	test("caching returns different functions for different templates", () => {
		const hbs = fumanchu({ caching: true });
		const yearTemplate = hbs.compile("{{year}}");
		const nameTemplate = hbs.compile("{{name}}");
		expect(yearTemplate).not.toBe(nameTemplate);
	});

	test("without caching compile returns new function each time", () => {
		const hbs = fumanchu();
		const first = hbs.compile("{{year}}");
		const second = hbs.compile("{{year}}");
		expect(first).not.toBe(second);
	});

	test("cached template renders correctly with different contexts", () => {
		const hbs = fumanchu({ caching: true });
		const template = hbs.compile("Hello {{name}}!");
		expect(template({ name: "Alice" })).toBe("Hello Alice!");
		expect(template({ name: "Bob" })).toBe("Hello Bob!");
		// second compile returns same function
		const template2 = hbs.compile("Hello {{name}}!");
		expect(template2).toBe(template);
		expect(template2({ name: "Charlie" })).toBe("Hello Charlie!");
	});

	test("shared CacheableMemory instance across multiple fumanchu calls", () => {
		const cache = new CacheableMemory({ useClone: false });
		const hbs1 = fumanchu({ caching: cache });
		const hbs2 = fumanchu({ caching: cache });
		const compiled1 = hbs1.compile("{{year}}");
		const compiled2 = hbs2.compile("{{year}}");
		expect(compiled1).toBe(compiled2);
	});

	test("separate caches do not share compiled templates", () => {
		const hbs1 = fumanchu({ caching: true });
		const hbs2 = fumanchu({ caching: true });
		const compiled1 = hbs1.compile("{{year}}");
		const compiled2 = hbs2.compile("{{year}}");
		expect(compiled1).not.toBe(compiled2);
	});

	test("caching with compile options creates separate cache entries", () => {
		const hbs = fumanchu({ caching: true });
		const withEscape = hbs.compile("{{name}}");
		const noEscape = hbs.compile("{{name}}", { noEscape: true });
		expect(withEscape).not.toBe(noEscape);
	});

	test("caching with same compile options returns cached function", () => {
		const hbs = fumanchu({ caching: true });
		const first = hbs.compile("{{name}}", { noEscape: true });
		const second = hbs.compile("{{name}}", { noEscape: true });
		expect(first).toBe(second);
	});

	test("caching works with helpers", () => {
		const hbs = fumanchu({ caching: true });
		const template = hbs.compile('{{#if (eq foo "bar")}}yes{{else}}no{{/if}}');
		expect(template({ foo: "bar" })).toBe("yes");
		expect(template({ foo: "baz" })).toBe("no");
	});

	test("caching with FumanchuCachingOptions lruSize", () => {
		const hbs = fumanchu({ caching: { lruSize: 2 } });
		const t1 = hbs.compile("{{a}}");
		const t2 = hbs.compile("{{b}}");
		expect(t1({ a: "1" })).toBe("1");
		expect(t2({ b: "2" })).toBe("2");
	});

	test("caching disabled with false", () => {
		const hbs = fumanchu({ caching: false });
		const first = hbs.compile("{{year}}");
		const second = hbs.compile("{{year}}");
		expect(first).not.toBe(second);
	});
});
