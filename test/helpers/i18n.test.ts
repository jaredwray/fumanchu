import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/i18n.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("i18n", () => {
	const i18nFn = getHelper("i18n");

	it("returns translation for language", () => {
		const context = { language: "en", en: { hello: "hi" } };
		expect(i18nFn.call(context, "hello")).toBe("hi");
	});

	it("handles lang alias and options", () => {
		const context = { lang: "en", en: { greet: "hey" } };
		expect(i18nFn.call(context, "greet", { hash: {} })).toBe("hey");
	});

	it("throws when key is not string", () => {
		const context = { language: "en", en: { foo: "bar" } };
		expect(() => i18nFn.call(context, 123 as unknown as never)).toThrow();
	});

	it("throws when language is not string", () => {
		const context = { language: 10 as unknown as never, en: { foo: "bar" } };
		expect(() => i18nFn.call(context, "foo")).toThrow();
	});

	it("throws when language not found", () => {
		const context = { language: "fr", en: { foo: "bar" } };
		expect(() => i18nFn.call(context, "foo")).toThrow();
	});

	it("throws when property not found", () => {
		const context = { language: "en", en: { other: "bar" } };
		expect(() => i18nFn.call(context, "foo")).toThrow();
	});
});
