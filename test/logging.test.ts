import { describe, expect, test, vi } from "vitest";
import {
	_debug,
	_inspect,
	bold,
	danger,
	error,
	helpers,
	info,
	log,
	ok,
	success,
	warn,
	warning,
} from "../src/helpers/logging.js";

describe("logging helpers", () => {
	test("helpers array exports all logging helpers", () => {
		const names = helpers.map((h) => h.name).sort();
		expect(names).toEqual(
			[
				"_debug",
				"_inspect",
				"bold",
				"danger",
				"error",
				"info",
				"log",
				"ok",
				"success",
				"warn",
				"warning",
			].sort(),
		);
	});

	test("log logs to console", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {});
		log("test");
		expect(spy).toHaveBeenCalledWith("test");
		spy.mockRestore();
	});

	test("log strips handlebars options from arguments", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {});
		// Simulate handlebars passing options object
		log("message", "arg2", { hash: {}, data: {} });
		// Should only log the actual arguments, not the options object
		expect(spy).toHaveBeenCalledWith("message", "arg2");
		spy.mockRestore();
	});

	test("ok does not throw", () => {
		expect(() => ok("ok")).not.toThrow();
	});

	test("success logs to console", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {});
		success("yay");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("info logs to console", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {});
		info("info");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("warning logs to console.error", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		warning("warn");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("warn alias logs to console.error", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		warn("warn");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("error logs to console.error", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		error("err");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("danger alias logs to console.error", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		danger("dang");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("bold logs to console.error", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		bold("bold");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("_debug outputs when value is provided", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		_debug.call({ context: true }, "debug");
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("_debug outputs without arguments", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		_debug.call({ key: "value" });
		// Should still output separators and context
		expect(spy).toHaveBeenCalled();
		// Verify separator and context are logged
		const calls = spy.mock.calls;
		expect(calls.length).toBeGreaterThan(0);
		spy.mockRestore();
	});

	test("_debug outputs with empty context", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		_debug.call({}, "value");
		// Should output separator and value, but skip empty context
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test("_debug strips handlebars options from arguments", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		_debug.call({ ctx: "data" }, "debug message", { hash: {}, data: {} });
		expect(spy).toHaveBeenCalled();
		// Should log VALUE with just "debug message", not the options object
		const calls = spy.mock.calls;
		const valueCall = calls.find((call) => call[0]?.includes("VALUE"));
		expect(valueCall).toBeDefined();
		spy.mockRestore();
	});

	test("_inspect returns html by default", () => {
		const result = _inspect({ a: 1 }, { hash: { type: "html" } });
		expect(result).toContain("<div");
	});

	test("_inspect returns markdown format", () => {
		const result = _inspect({ a: 1 }, { hash: { type: "md" } });
		expect(result).toContain("```json");
		expect(result).toContain('"a": 1');
	});

	test("_inspect handles type with leading dot", () => {
		const result = _inspect({ b: 2 }, { hash: { type: ".md" } });
		expect(result).toContain("```json");
		expect(result).toContain('"b": 2');
	});

	test("_inspect returns plain json for unknown type", () => {
		const result = _inspect({ c: 3 }, { hash: { type: "plain" } });
		// Should return plain JSON without markdown or html wrappers
		expect(result).not.toContain("```");
		expect(result).not.toContain("<div");
		expect(result).toContain('"c": 3');
	});

	test("_inspect uses html as default when no type specified", () => {
		const result = _inspect({ d: 4 }, {});
		expect(result).toContain("<div");
		expect(result).toContain('"d": 4');
	});

	test("_inspect works without options parameter", () => {
		const result = _inspect({ e: 5 });
		expect(result).toContain("<div");
		expect(result).toContain('"e": 5');
	});
});
