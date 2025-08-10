// @ts-expect-error
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
	{
		name: "log",
		category: "logging",
		compatibility: ["nodejs"],
		fn: log as unknown as Helper["fn"],
	},
	{
		name: "ok",
		category: "logging",
		compatibility: ["nodejs"],
		fn: ok as unknown as Helper["fn"],
	},
	{
		name: "success",
		category: "logging",
		compatibility: ["nodejs"],
		fn: success as unknown as Helper["fn"],
	},
	{
		name: "info",
		category: "logging",
		compatibility: ["nodejs"],
		fn: info as unknown as Helper["fn"],
	},
	{
		name: "warning",
		category: "logging",
		compatibility: ["nodejs"],
		fn: warning as unknown as Helper["fn"],
	},
	{
		name: "warn",
		category: "logging",
		compatibility: ["nodejs"],
		fn: warn as unknown as Helper["fn"],
	},
	{
		name: "error",
		category: "logging",
		compatibility: ["nodejs"],
		fn: error as unknown as Helper["fn"],
	},
	{
		name: "danger",
		category: "logging",
		compatibility: ["nodejs"],
		fn: danger as unknown as Helper["fn"],
	},
	{
		name: "bold",
		category: "logging",
		compatibility: ["nodejs"],
		fn: bold as unknown as Helper["fn"],
	},
	{
		name: "_debug",
		category: "logging",
		compatibility: ["nodejs"],
		fn: _debug as unknown as Helper["fn"],
	},
	{
		name: "_inspect",
		category: "logging",
		compatibility: ["nodejs"],
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
