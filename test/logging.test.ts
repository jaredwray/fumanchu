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

	test("_inspect returns html by default", () => {
		const result = _inspect({ a: 1 }, { hash: { type: "html" } });
		expect(result).toContain("<div");
	});
});
