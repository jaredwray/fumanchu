import { describe, expect, it } from "vitest";
import { get } from "../src/utils.js";

describe("get", () => {
	it("returns value from nested object using dot notation", () => {
		const obj = { a: { b: { c: "value" } } };
		expect(get(obj, "a.b.c")).toBe("value");
	});

	it("returns value from nested object using array path", () => {
		const obj = { a: { b: { c: "value" } } };
		expect(get(obj, ["a", "b", "c"])).toBe("value");
	});

	it("returns undefined when object is null", () => {
		expect(get(null, "a.b.c")).toBeUndefined();
	});

	it("returns undefined when object is undefined", () => {
		expect(get(undefined, "a.b.c")).toBeUndefined();
	});

	it("returns undefined when object is not an object", () => {
		expect(get("string", "a.b.c")).toBeUndefined();
		expect(get(123, "a.b.c")).toBeUndefined();
		expect(get(true, "a.b.c")).toBeUndefined();
	});

	it("returns undefined when path does not exist", () => {
		const obj = { a: { b: "value" } };
		expect(get(obj, "a.b.c")).toBeUndefined();
	});

	it("returns undefined when intermediate path is null", () => {
		const obj = { a: { b: null } };
		expect(get(obj, "a.b.c")).toBeUndefined();
	});

	it("returns undefined when intermediate path is not an object", () => {
		const obj = { a: { b: "string" } };
		expect(get(obj, "a.b.c")).toBeUndefined();
	});

	it("returns value at root level", () => {
		const obj = { value: "test" };
		expect(get(obj, "value")).toBe("test");
	});

	it("returns value using single element array path", () => {
		const obj = { value: "test" };
		expect(get(obj, ["value"])).toBe("test");
	});

	it("handles empty string path", () => {
		const obj = { "": "empty" };
		expect(get(obj, "")).toBe("empty");
	});

	it("handles numeric string keys", () => {
		const obj = { "0": { "1": "value" } };
		expect(get(obj, "0.1")).toBe("value");
	});

	it("returns null values correctly", () => {
		const obj = { a: { b: null } };
		expect(get(obj, "a.b")).toBeNull();
	});

	it("returns false values correctly", () => {
		const obj = { a: { b: false } };
		expect(get(obj, "a.b")).toBe(false);
	});

	it("returns zero values correctly", () => {
		const obj = { a: { b: 0 } };
		expect(get(obj, "a.b")).toBe(0);
	});

	it("returns empty string values correctly", () => {
		const obj = { a: { b: "" } };
		expect(get(obj, "a.b")).toBe("");
	});

	it("handles arrays as objects", () => {
		const obj = { arr: ["zero", "one", "two"] };
		expect(get(obj, "arr.1")).toBe("one");
	});

	it("handles nested arrays", () => {
		const obj = { arr: [{ nested: "value" }] };
		expect(get(obj, "arr.0.nested")).toBe("value");
	});
});
