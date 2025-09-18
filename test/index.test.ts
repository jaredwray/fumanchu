import Handlebars from "handlebars";
import { describe, expect, test } from "vitest";
import {
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
});
