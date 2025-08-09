import loggingHelpers from "logging-helpers";
import type { Helper } from "../helper-registry.js";

const {
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
} = loggingHelpers as Record<string, (...arguments_: unknown[]) => unknown>;

export const helpers: Helper[] = [
	{ name: "log", category: "logging", fn: log as unknown as Helper["fn"] },
	{ name: "ok", category: "logging", fn: ok as unknown as Helper["fn"] },
	{
		name: "success",
		category: "logging",
		fn: success as unknown as Helper["fn"],
	},
	{ name: "info", category: "logging", fn: info as unknown as Helper["fn"] },
	{
		name: "warning",
		category: "logging",
		fn: warning as unknown as Helper["fn"],
	},
	{ name: "warn", category: "logging", fn: warn as unknown as Helper["fn"] },
	{ name: "error", category: "logging", fn: error as unknown as Helper["fn"] },
	{
		name: "danger",
		category: "logging",
		fn: danger as unknown as Helper["fn"],
	},
	{ name: "bold", category: "logging", fn: bold as unknown as Helper["fn"] },
	{
		name: "_debug",
		category: "logging",
		fn: _debug as unknown as Helper["fn"],
	},
	{
		name: "_inspect",
		category: "logging",
		fn: _inspect as unknown as Helper["fn"],
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
