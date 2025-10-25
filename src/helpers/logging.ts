// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context
import type { Helper } from "../helper-registry.js";

/**
 * ANSI color codes for terminal output
 */
const colors = {
	green: (str: string) => `\x1b[32m${str}\x1b[0m`,
	cyan: (str: string) => `\x1b[36m${str}\x1b[0m`,
	yellow: (str: string) => `\x1b[33m${str}\x1b[0m`,
	red: (str: string) => `\x1b[31m${str}\x1b[0m`,
	bold: (str: string) => `\x1b[1m${str}\x1b[0m`,
};

/**
 * Remove handlebars options from arguments if present
 */
function cleanArgs(args: any[]): any[] {
	const last = args[args.length - 1];
	// Remove handlebars options object if it exists
	if (
		args.length > 1 &&
		typeof last === "object" &&
		last !== null &&
		"hash" in last
	) {
		return args.slice(0, -1);
	}
	return args;
}

/**
 * Helper for logging an unstyled message to the terminal.
 */
function log(...args: any[]): string {
	const cleanedArgs = cleanArgs(args);
	console.log(...cleanedArgs);
	return "";
}

/**
 * Helper for logging a green colored "ok" message preceded by a checkmark
 * to the terminal.
 */
function ok(...args: any[]): string {
	const cleanedArgs = cleanArgs(args);
	const message = cleanedArgs.join(" ");
	console.log(colors.green(`✓ ${message}`));
	return "";
}

/**
 * Helper for logging a green colored "success" message to the terminal.
 */
function success(...args: any[]): string {
	const cleanedArgs = cleanArgs(args);
	const message = cleanedArgs.map((arg) => String(arg)).join(" ");
	console.log(colors.green(message));
	return "";
}

/**
 * Helper for logging a cyan colored "informational" message to the terminal.
 */
function info(...args: any[]): string {
	const cleanedArgs = cleanArgs(args);
	const message = cleanedArgs.map((arg) => String(arg)).join(" ");
	console.log(colors.cyan(message));
	return "";
}

/**
 * Helper for logging a yellow colored "warning" message to the terminal.
 */
function warning(...args: any[]): string {
	const cleanedArgs = cleanArgs(args);
	const message = cleanedArgs.map((arg) => String(arg)).join(" ");
	console.error(colors.yellow(message));
	return "";
}

/**
 * Alias for warning helper.
 */
const warn = warning;

/**
 * Helper for logging a red colored "error" message to the terminal.
 */
function error(...args: any[]): string {
	const cleanedArgs = cleanArgs(args);
	const message = cleanedArgs.map((arg) => String(arg)).join(" ");
	console.error(colors.red(message));
	return "";
}

/**
 * Alias for error helper.
 */
const danger = error;

/**
 * Helper for logging a bold formatted message to the terminal.
 */
function bold(...args: any[]): string {
	const cleanedArgs = cleanArgs(args);
	const message = cleanedArgs.map((arg) => String(arg)).join(" ");
	console.error(colors.bold(message));
	return "";
}

/**
 * Helper for outputting a debug statement with the current context
 */
function _debug(this: any, ...args: any[]): string {
	const separator = "─".repeat(50);
	console.error(colors.cyan(separator));

	if (args.length > 0) {
		// Remove handlebars options if present
		const cleanedArgs = cleanArgs(args);
		console.error(colors.cyan("VALUE:"), cleanedArgs[0]);
	}

	if (this && Object.keys(this).length > 0) {
		console.error(colors.cyan("CONTEXT:"), this);
	}

	console.error(colors.cyan(separator));
	return "";
}

/**
 * Helper for inspecting and formatting values as JSON
 */
function _inspect(context: any, options?: any): string {
	const val = JSON.stringify(context, null, 2);
	const type = (options?.hash?.type as string) || "html";

	return switchOutput(type, val);
}

/**
 * Generate output based on the given type
 */
function switchOutput(type: string, json: string): string {
	if (type[0] === ".") {
		type = type.slice(1);
	}

	switch (type) {
		case "md":
			return `\n\`\`\`json\n${json}\n\`\`\`\n`;
		case "html":
			return `<div class="highlight highlight-json">\n<pre><code>\n${json}</code></pre></div>`;
		default:
			return json;
	}
}

export const helpers: Helper[] = [
	{
		name: "log",
		category: "logging",
		compatibility: ["nodejs"],
		fn: log as any,
	},
	{
		name: "ok",
		category: "logging",
		compatibility: ["nodejs"],
		fn: ok as any,
	},
	{
		name: "success",
		category: "logging",
		compatibility: ["nodejs"],
		fn: success as any,
	},
	{
		name: "info",
		category: "logging",
		compatibility: ["nodejs"],
		fn: info as any,
	},
	{
		name: "warning",
		category: "logging",
		compatibility: ["nodejs"],
		fn: warning as any,
	},
	{
		name: "warn",
		category: "logging",
		compatibility: ["nodejs"],
		fn: warn as any,
	},
	{
		name: "error",
		category: "logging",
		compatibility: ["nodejs"],
		fn: error as any,
	},
	{
		name: "danger",
		category: "logging",
		compatibility: ["nodejs"],
		fn: danger as any,
	},
	{
		name: "bold",
		category: "logging",
		compatibility: ["nodejs"],
		fn: bold as any,
	},
	{
		name: "_debug",
		category: "logging",
		compatibility: ["nodejs"],
		fn: _debug as any,
	},
	{
		name: "_inspect",
		category: "logging",
		compatibility: ["nodejs"],
		fn: _inspect as any,
	},
];

export {
	log,
	ok,
	success,
	info,
	warning,
	warn,
	error,
	danger,
	bold,
	_debug,
	_inspect,
};
