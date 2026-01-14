import { describe, expect, test } from "vitest";
import {
	getAllHelperNames,
	getAllHelpers,
	getBrowserOnlyHelperNames,
	getHelperCompatibilitySummary,
	getHelperCountByEnvironment,
	getHelperNamesByEnvironment,
	getHelpersByEnvironment,
	getNodejsOnlyHelperNames,
	getUniversalHelperNames,
	HelperCompatibility,
	isHelperCompatible,
} from "../../src/helpers/environment.js";

describe("HelperCompatibility Enum", () => {
	test("should have ALL value", () => {
		expect(HelperCompatibility.ALL).toBe("all");
	});

	test("should have NODEJS value", () => {
		expect(HelperCompatibility.NODEJS).toBe("nodejs");
	});

	test("should have BROWSER value", () => {
		expect(HelperCompatibility.BROWSER).toBe("browser");
	});
});

describe("getAllHelpers", () => {
	test("should return all helpers", () => {
		const helpers = getAllHelpers();
		expect(helpers).toBeDefined();
		expect(Array.isArray(helpers)).toBe(true);
		expect(helpers.length).toBeGreaterThan(150);
	});

	test("should return helpers with required properties", () => {
		const helpers = getAllHelpers();
		for (const helper of helpers) {
			expect(helper).toHaveProperty("name");
			expect(helper).toHaveProperty("category");
			expect(helper).toHaveProperty("fn");
			expect(typeof helper.name).toBe("string");
			expect(typeof helper.category).toBe("string");
			expect(typeof helper.fn).toBe("function");
		}
	});
});

describe("getHelpersByEnvironment", () => {
	test("should return all helpers for ALL environment", () => {
		const helpers = getHelpersByEnvironment(HelperCompatibility.ALL);
		const allHelpers = getAllHelpers();
		expect(helpers.length).toBe(allHelpers.length);
	});

	test("should return nodejs compatible helpers for NODEJS environment", () => {
		const helpers = getHelpersByEnvironment(HelperCompatibility.NODEJS);
		expect(helpers.length).toBeGreaterThan(150);
		// All returned helpers should be nodejs compatible
		for (const helper of helpers) {
			if (helper.compatibility && helper.compatibility.length > 0) {
				expect(helper.compatibility).toContain(HelperCompatibility.NODEJS);
			}
		}
	});

	test("should return browser compatible helpers for BROWSER environment", () => {
		const helpers = getHelpersByEnvironment(HelperCompatibility.BROWSER);
		expect(helpers.length).toBeGreaterThan(100);
		// All returned helpers should be browser compatible
		for (const helper of helpers) {
			if (helper.compatibility && helper.compatibility.length > 0) {
				expect(helper.compatibility).toContain(HelperCompatibility.BROWSER);
			}
		}
	});

	test("should include helpers with no compatibility set", () => {
		const browserHelpers = getHelpersByEnvironment(HelperCompatibility.BROWSER);
		const nodejsHelpers = getHelpersByEnvironment(HelperCompatibility.NODEJS);
		const allHelpers = getAllHelpers();

		// Helpers without compatibility should be in both browser and nodejs lists
		const helpersWithoutCompatibility = allHelpers.filter(
			(h) => !h.compatibility || h.compatibility.length === 0,
		);

		for (const helper of helpersWithoutCompatibility) {
			expect(browserHelpers.some((h) => h.name === helper.name)).toBe(true);
			expect(nodejsHelpers.some((h) => h.name === helper.name)).toBe(true);
		}
	});
});

describe("getHelperNamesByEnvironment", () => {
	test("should return array of strings for ALL", () => {
		const names = getHelperNamesByEnvironment(HelperCompatibility.ALL);
		expect(Array.isArray(names)).toBe(true);
		for (const name of names) {
			expect(typeof name).toBe("string");
		}
	});

	test("should return array of strings for NODEJS", () => {
		const names = getHelperNamesByEnvironment(HelperCompatibility.NODEJS);
		expect(Array.isArray(names)).toBe(true);
		expect(names.length).toBeGreaterThan(150);
	});

	test("should return array of strings for BROWSER", () => {
		const names = getHelperNamesByEnvironment(HelperCompatibility.BROWSER);
		expect(Array.isArray(names)).toBe(true);
		expect(names.length).toBeGreaterThan(100);
	});

	test("should match count of getHelpersByEnvironment", () => {
		for (const env of [
			HelperCompatibility.ALL,
			HelperCompatibility.NODEJS,
			HelperCompatibility.BROWSER,
		]) {
			const helpers = getHelpersByEnvironment(env);
			const names = getHelperNamesByEnvironment(env);
			expect(names.length).toBe(helpers.length);
		}
	});
});

describe("getAllHelperNames", () => {
	test("should return all helper names", () => {
		const names = getAllHelperNames();
		const helpers = getAllHelpers();
		expect(names.length).toBe(helpers.length);
	});

	test("should return names as an array", () => {
		const names = getAllHelperNames();
		expect(Array.isArray(names)).toBe(true);
		expect(names.length).toBeGreaterThan(150);
	});
});

describe("getNodejsOnlyHelperNames", () => {
	test("should return nodejs-only helper names", () => {
		const names = getNodejsOnlyHelperNames();
		expect(Array.isArray(names)).toBe(true);
		expect(names.length).toBeGreaterThan(0);
	});

	test("should include fs helpers", () => {
		const names = getNodejsOnlyHelperNames();
		expect(names).toContain("read");
		expect(names).toContain("readdir");
		expect(names).toContain("fileSize");
	});

	test("should include path helpers", () => {
		const names = getNodejsOnlyHelperNames();
		expect(names).toContain("absolute");
		expect(names).toContain("dirname");
		expect(names).toContain("basename");
	});

	test("should not include browser-compatible helpers", () => {
		const names = getNodejsOnlyHelperNames();
		// String helpers are browser-compatible
		expect(names).not.toContain("camelcase");
		expect(names).not.toContain("capitalize");
	});
});

describe("getBrowserOnlyHelperNames", () => {
	test("should return browser-only helper names", () => {
		const names = getBrowserOnlyHelperNames();
		expect(Array.isArray(names)).toBe(true);
		// Currently there are no browser-only helpers in the codebase
		// All browser-compatible helpers also work in nodejs
	});

	test("should not include nodejs-only helpers", () => {
		const names = getBrowserOnlyHelperNames();
		expect(names).not.toContain("read");
		expect(names).not.toContain("absolute");
	});
});

describe("getUniversalHelperNames", () => {
	test("should return universal helper names", () => {
		const names = getUniversalHelperNames();
		expect(Array.isArray(names)).toBe(true);
		expect(names.length).toBeGreaterThan(100);
	});

	test("should include string helpers", () => {
		const names = getUniversalHelperNames();
		expect(names).toContain("camelcase");
		expect(names).toContain("capitalize");
		expect(names).toContain("uppercase");
	});

	test("should include array helpers", () => {
		const names = getUniversalHelperNames();
		expect(names).toContain("first");
		expect(names).toContain("last");
	});

	test("should not include nodejs-only helpers", () => {
		const names = getUniversalHelperNames();
		expect(names).not.toContain("read");
		expect(names).not.toContain("absolute");
	});
});

describe("isHelperCompatible", () => {
	test("should return true for ALL environment with any helper", () => {
		expect(isHelperCompatible("camelcase", HelperCompatibility.ALL)).toBe(true);
		expect(isHelperCompatible("read", HelperCompatibility.ALL)).toBe(true);
	});

	test("should return true for NODEJS with nodejs helper", () => {
		expect(isHelperCompatible("read", HelperCompatibility.NODEJS)).toBe(true);
		expect(isHelperCompatible("absolute", HelperCompatibility.NODEJS)).toBe(
			true,
		);
	});

	test("should return true for BROWSER with browser helper", () => {
		expect(isHelperCompatible("camelcase", HelperCompatibility.BROWSER)).toBe(
			true,
		);
		expect(isHelperCompatible("uppercase", HelperCompatibility.BROWSER)).toBe(
			true,
		);
	});

	test("should return false for BROWSER with nodejs-only helper", () => {
		expect(isHelperCompatible("read", HelperCompatibility.BROWSER)).toBe(false);
		expect(isHelperCompatible("absolute", HelperCompatibility.BROWSER)).toBe(
			false,
		);
	});

	test("should return false for non-existent helper", () => {
		expect(
			isHelperCompatible("nonExistentHelper", HelperCompatibility.ALL),
		).toBe(false);
		expect(
			isHelperCompatible("nonExistentHelper", HelperCompatibility.NODEJS),
		).toBe(false);
		expect(
			isHelperCompatible("nonExistentHelper", HelperCompatibility.BROWSER),
		).toBe(false);
	});

	test("should return true for helpers with no compatibility for any environment", () => {
		// Helpers without compatibility should work in all environments
		const allHelpers = getAllHelpers();
		const helpersWithoutCompatibility = allHelpers.filter(
			(h) => !h.compatibility || h.compatibility.length === 0,
		);

		for (const helper of helpersWithoutCompatibility) {
			expect(isHelperCompatible(helper.name, HelperCompatibility.NODEJS)).toBe(
				true,
			);
			expect(isHelperCompatible(helper.name, HelperCompatibility.BROWSER)).toBe(
				true,
			);
		}
	});
});

describe("getHelperCountByEnvironment", () => {
	test("should return count for ALL environment", () => {
		const count = getHelperCountByEnvironment(HelperCompatibility.ALL);
		const helpers = getAllHelpers();
		expect(count).toBe(helpers.length);
	});

	test("should return count for NODEJS environment", () => {
		const count = getHelperCountByEnvironment(HelperCompatibility.NODEJS);
		expect(count).toBeGreaterThan(150);
	});

	test("should return count for BROWSER environment", () => {
		const count = getHelperCountByEnvironment(HelperCompatibility.BROWSER);
		expect(count).toBeGreaterThan(100);
	});

	test("should match helper array length", () => {
		for (const env of [
			HelperCompatibility.ALL,
			HelperCompatibility.NODEJS,
			HelperCompatibility.BROWSER,
		]) {
			const count = getHelperCountByEnvironment(env);
			const helpers = getHelpersByEnvironment(env);
			expect(count).toBe(helpers.length);
		}
	});
});

describe("getHelperCompatibilitySummary", () => {
	test("should return summary object with all properties", () => {
		const summary = getHelperCompatibilitySummary();
		expect(summary).toHaveProperty("all");
		expect(summary).toHaveProperty("nodejs");
		expect(summary).toHaveProperty("browser");
		expect(summary).toHaveProperty("nodejsOnly");
		expect(summary).toHaveProperty("browserOnly");
		expect(summary).toHaveProperty("universal");
	});

	test("should have correct types for all properties", () => {
		const summary = getHelperCompatibilitySummary();
		expect(typeof summary.all).toBe("number");
		expect(typeof summary.nodejs).toBe("number");
		expect(typeof summary.browser).toBe("number");
		expect(typeof summary.nodejsOnly).toBe("number");
		expect(typeof summary.browserOnly).toBe("number");
		expect(typeof summary.universal).toBe("number");
	});

	test("should have all count equal to getAllHelpers length", () => {
		const summary = getHelperCompatibilitySummary();
		const helpers = getAllHelpers();
		expect(summary.all).toBe(helpers.length);
	});

	test("should have nodejs count greater than or equal to nodejsOnly", () => {
		const summary = getHelperCompatibilitySummary();
		expect(summary.nodejs).toBeGreaterThanOrEqual(summary.nodejsOnly);
	});

	test("should have browser count greater than or equal to browserOnly", () => {
		const summary = getHelperCompatibilitySummary();
		expect(summary.browser).toBeGreaterThanOrEqual(summary.browserOnly);
	});

	test("should satisfy: nodejsOnly + browserOnly + universal <= all", () => {
		const summary = getHelperCompatibilitySummary();
		expect(summary.nodejsOnly + summary.browserOnly + summary.universal).toBe(
			summary.all,
		);
	});
});

describe("Integration tests", () => {
	test("nodejs-only helpers should not be in browser list", () => {
		const nodejsOnly = getNodejsOnlyHelperNames();
		const browserNames = getHelperNamesByEnvironment(
			HelperCompatibility.BROWSER,
		);

		for (const name of nodejsOnly) {
			expect(browserNames).not.toContain(name);
		}
	});

	test("browser-only helpers should not be in nodejs list", () => {
		const browserOnly = getBrowserOnlyHelperNames();
		const nodejsNames = getHelperNamesByEnvironment(HelperCompatibility.NODEJS);

		for (const name of browserOnly) {
			expect(nodejsNames).not.toContain(name);
		}
	});

	test("universal helpers should be in both browser and nodejs lists", () => {
		const universal = getUniversalHelperNames();
		const browserNames = getHelperNamesByEnvironment(
			HelperCompatibility.BROWSER,
		);
		const nodejsNames = getHelperNamesByEnvironment(HelperCompatibility.NODEJS);

		for (const name of universal) {
			expect(browserNames).toContain(name);
			expect(nodejsNames).toContain(name);
		}
	});

	test("all helper categories should be represented", () => {
		const helpers = getAllHelpers();
		const categories = new Set(helpers.map((h) => h.category));

		// Should have most major categories
		expect(categories.has("string")).toBe(true);
		expect(categories.has("array")).toBe(true);
		expect(categories.has("comparison")).toBe(true);
		expect(categories.has("fs")).toBe(true);
		expect(categories.has("path")).toBe(true);
		expect(categories.has("math")).toBe(true);
		expect(categories.has("date")).toBe(true);
		expect(categories.has("object")).toBe(true);
	});
});
