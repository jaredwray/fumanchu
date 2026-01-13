// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { helpers } from "../../src/helpers/logging.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("logging helpers", () => {
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;
	let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
		consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		consoleLogSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});

	describe("log", () => {
		it("should log a message to console", () => {
			const logFn = getHelper("log");
			const result = logFn("test message");
			expect(consoleLogSpy).toHaveBeenCalledWith("test message");
			expect(result).toBe("");
		});

		it("should log multiple arguments", () => {
			const logFn = getHelper("log");
			const result = logFn("hello", "world");
			expect(consoleLogSpy).toHaveBeenCalledWith("hello", "world");
			expect(result).toBe("");
		});

		it("should strip handlebars options object", () => {
			const logFn = getHelper("log");
			logFn("message", { hash: {} });
			expect(consoleLogSpy).toHaveBeenCalledWith("message");
		});
	});

	describe("ok", () => {
		it("should log a green checkmark message", () => {
			const okFn = getHelper("ok");
			const result = okFn("operation succeeded");
			expect(consoleLogSpy).toHaveBeenCalled();
			const call = consoleLogSpy.mock.calls[0][0];
			expect(call).toContain("✓");
			expect(call).toContain("operation succeeded");
			expect(result).toBe("");
		});

		it("should join multiple arguments", () => {
			const okFn = getHelper("ok");
			okFn("test", "passed");
			const call = consoleLogSpy.mock.calls[0][0];
			expect(call).toContain("test passed");
		});
	});

	describe("success", () => {
		it("should log a green success message", () => {
			const successFn = getHelper("success");
			const result = successFn("build completed");
			expect(consoleLogSpy).toHaveBeenCalled();
			const call = consoleLogSpy.mock.calls[0][0];
			expect(call).toContain("build completed");
			expect(result).toBe("");
		});

		it("should convert non-string arguments to strings", () => {
			const successFn = getHelper("success");
			successFn("count:", 42);
			const call = consoleLogSpy.mock.calls[0][0];
			expect(call).toContain("count: 42");
		});
	});

	describe("info", () => {
		it("should log a cyan info message", () => {
			const infoFn = getHelper("info");
			const result = infoFn("processing data");
			expect(consoleLogSpy).toHaveBeenCalled();
			const call = consoleLogSpy.mock.calls[0][0];
			expect(call).toContain("processing data");
			expect(result).toBe("");
		});
	});

	describe("warning", () => {
		it("should log a yellow warning message to stderr", () => {
			const warningFn = getHelper("warning");
			const result = warningFn("deprecated feature");
			expect(consoleErrorSpy).toHaveBeenCalled();
			const call = consoleErrorSpy.mock.calls[0][0];
			expect(call).toContain("deprecated feature");
			expect(result).toBe("");
		});
	});

	describe("warn", () => {
		it("should be an alias for warning", () => {
			const warnFn = getHelper("warn");
			warnFn("caution message");
			expect(consoleErrorSpy).toHaveBeenCalled();
			const call = consoleErrorSpy.mock.calls[0][0];
			expect(call).toContain("caution message");
		});
	});

	describe("error", () => {
		it("should log a red error message to stderr", () => {
			const errorFn = getHelper("error");
			const result = errorFn("something went wrong");
			expect(consoleErrorSpy).toHaveBeenCalled();
			const call = consoleErrorSpy.mock.calls[0][0];
			expect(call).toContain("something went wrong");
			expect(result).toBe("");
		});
	});

	describe("danger", () => {
		it("should be an alias for error", () => {
			const dangerFn = getHelper("danger");
			dangerFn("critical failure");
			expect(consoleErrorSpy).toHaveBeenCalled();
			const call = consoleErrorSpy.mock.calls[0][0];
			expect(call).toContain("critical failure");
		});
	});

	describe("bold", () => {
		it("should log a bold message to stderr", () => {
			const boldFn = getHelper("bold");
			const result = boldFn("important notice");
			expect(consoleErrorSpy).toHaveBeenCalled();
			const call = consoleErrorSpy.mock.calls[0][0];
			expect(call).toContain("important notice");
			expect(result).toBe("");
		});
	});

	describe("_debug", () => {
		it("should output debug information", () => {
			const debugFn = getHelper("_debug");
			const result = debugFn.call({ name: "test" }, "debug value");
			expect(consoleErrorSpy).toHaveBeenCalled();
			expect(result).toBe("");
		});

		it("should display context when available", () => {
			const debugFn = getHelper("_debug");
			const context = { foo: "bar" };
			debugFn.call(context, "test");
			const calls = consoleErrorSpy.mock.calls;
			const hasContext = calls.some(
				(call) =>
					call.length > 1 && JSON.stringify(call[1]) === JSON.stringify(context),
			);
			expect(hasContext).toBe(true);
		});

		it("should handle empty arguments", () => {
			const debugFn = getHelper("_debug");
			const result = debugFn.call({});
			expect(consoleErrorSpy).toHaveBeenCalled();
			expect(result).toBe("");
		});
	});

	describe("_inspect", () => {
		it("should return JSON formatted output for html type", () => {
			const inspectFn = getHelper("_inspect");
			const result = inspectFn({ name: "test" });
			expect(result).toContain("<pre><code>");
			expect(result).toContain('"name": "test"');
		});

		it("should return markdown formatted output for md type", () => {
			const inspectFn = getHelper("_inspect");
			const result = inspectFn({ name: "test" }, { hash: { type: "md" } });
			expect(result).toContain("```json");
			expect(result).toContain('"name": "test"');
		});

		it("should return raw JSON for other types", () => {
			const inspectFn = getHelper("_inspect");
			const result = inspectFn({ name: "test" }, { hash: { type: "raw" } });
			expect(result).toBe('{\n  "name": "test"\n}');
		});

		it("should handle type with leading dot", () => {
			const inspectFn = getHelper("_inspect");
			const result = inspectFn({ name: "test" }, { hash: { type: ".md" } });
			expect(result).toContain("```json");
		});
	});

	describe("helper exports", () => {
		it("should export all expected helpers", () => {
			const helperNames = helpers.map((h) => h.name);
			expect(helperNames).toContain("log");
			expect(helperNames).toContain("ok");
			expect(helperNames).toContain("success");
			expect(helperNames).toContain("info");
			expect(helperNames).toContain("warning");
			expect(helperNames).toContain("warn");
			expect(helperNames).toContain("error");
			expect(helperNames).toContain("danger");
			expect(helperNames).toContain("bold");
			expect(helperNames).toContain("_debug");
			expect(helperNames).toContain("_inspect");
		});

		it("should have logging category for all helpers", () => {
			for (const helper of helpers) {
				expect(helper.category).toBe("logging");
			}
		});

		it("should have nodejs compatibility for all helpers", () => {
			for (const helper of helpers) {
				expect(helper.compatibility).toContain("nodejs");
			}
		});
	});
});
