import { describe, expect, test } from "vitest";
import {
	HelperRegistry,
	HelperRegistryCompatibility,
} from "../src/helper-registry.js";

describe("HelperRegistry", () => {
	test("should have helpers", () => {
		const registry = new HelperRegistry();
		expect(registry).toBeDefined();
	});

	test("should be able to access helpers", () => {
		const registry = new HelperRegistry();
		expect(registry.helpers).toBeDefined();
	});

	test("includes array helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("after")).toBeTruthy();
	});
	test("includes comparison helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("and")).toBeTruthy();
	});
	test("includes fs helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("read")).toBeTruthy();
	});
	test("includes html helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("attr")).toBeTruthy();
	});
	test("includes markdown helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("md")).toBeTruthy();
	});
	test("includes i18n helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("i18n")).toBeTruthy();
	});
	test("includes inflection helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("inflect")).toBeTruthy();
	});
	test("includes logging helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("log")).toBeTruthy();
	});
	test("includes match helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("match")).toBeTruthy();
	});
	test("includes misc helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("noop")).toBeTruthy();
	});
	test("includes path helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("basename")).toBeTruthy();
	});
	test("includes string helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("camelcase")).toBeTruthy();
	});
	test("includes object helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("extend")).toBeTruthy();
	});
	test("includes regex helpers by default", () => {
		const registry = new HelperRegistry();
		expect(registry.has("toRegex")).toBeTruthy();
	});
});

describe("HelperRegistry Register", () => {
	test("should register a helper", () => {
		const registry = new HelperRegistry();
		registry.register({
			name: "test",
			category: "test",
			fn: () => "test",
		});
		expect(registry.has("test")).toBeTruthy();
	});

	test("should not register a helper twice", () => {
		const registry = new HelperRegistry();
		const helper = {
			name: "test",
			category: "test",
			fn: () => "test",
		};
		registry.register(helper);
		expect(registry.register(helper)).toBeFalsy();
	});
});

describe("HelperRegistry Filter", () => {
	test("should return nothing filter by name", () => {
		const registry = new HelperRegistry();
		registry.register({
			name: "demo",
			category: "demo",
			fn: () => "demo",
		});
		expect(registry.filter({ names: ["demo1"] }).length).toBe(0);
	});
	test("should filter by name", () => {
		const registry = new HelperRegistry();
		registry.register({
			name: "demo",
			category: "demo",
			fn: () => "demo",
		});
		expect(registry.filter({ names: ["demo"] }).length).toBe(1);
	});
	test("should filter by category", () => {
		const registry = new HelperRegistry();
		registry.register({
			name: "demo",
			category: "demo",
			fn: () => "demo",
		});
		registry.register({
			name: "demo2",
			category: "demo2",
			fn: () => "demo2",
		});
		registry.register({
			name: "demo3",
			category: "demo2",
			fn: () => "demo3",
		});
		expect(registry.filter({ categories: ["demo"] }).length).toBe(1);
		expect(registry.filter({ categories: ["demo", "demo2"] }).length).toBe(3);
	});

	test("helpers should filter by name", () => {
		const registry = new HelperRegistry();
		registry.register({
			name: "demo",
			category: "demo",
			fn: () => "demo",
		});
		expect(registry.filter({ names: ["demo"] }).length).toBe(1);
	});

	test("helpers property should be greater than 160", () => {
		const registry = new HelperRegistry();
		expect(registry.helpers.length).toBeGreaterThan(160);
	});

	test("should filter by compatibility", () => {
		const registry = new HelperRegistry();
		registry.register({
			name: "demo",
			category: "demo",
			compatibility: [HelperRegistryCompatibility.BROWSER],
			fn: () => "demo",
		});
		expect(
			registry.filter({ compatibility: [HelperRegistryCompatibility.BROWSER] })
				.length,
		).toBeGreaterThan(130);
	});
});
