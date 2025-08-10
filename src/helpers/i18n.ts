// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any
import get from "get-value";
import type { Helper } from "../helper-registry.js";

const i18n = function (
	this: any,
	prop: unknown,
	locals?: any,
	options?: { hash?: Record<string, unknown> },
): string {
	if (
		locals &&
		typeof locals === "object" &&
		"hash" in locals &&
		options === undefined
	) {
		options = locals;
		locals = {};
	}

	if (typeof prop !== "string") {
		throw new Error('{{i18n}} helper expected "key" to be a string');
	}

	const context = {
		...this,
		...(locals as Record<string, unknown>),
		...(options?.hash ?? {}),
	} as Record<string, unknown>;

	const lang = context.language || context.lang;
	if (typeof lang !== "string") {
		throw new TypeError('{{i18n}} helper expected "language" to be a string');
	}

	const cache = (context as Record<string, unknown>)[lang];
	if (typeof cache === "undefined") {
		throw new Error(`{{i18n}} helper cannot find language "${lang}"`);
	}

	const result = get(cache, prop as any);
	if (typeof result === "undefined") {
		throw new Error(
			'{{i18n}} helper cannot find property "' +
				String(prop) +
				'" for language "' +
				lang +
				'"',
		);
	}

	return String(result);
};

export const helpers: Helper[] = [
	{
		name: "i18n",
		category: "i18n",
		compatibility: ["browser", "nodejs"],
		fn: i18n,
	},
];

export { i18n };
