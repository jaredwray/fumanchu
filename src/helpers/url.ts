// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import type { Helper } from "../helper-registry-base.js";

const all: string[] = ["browser", "nodejs"];

const encodeUri = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return encodeURIComponent(str);
	}
};

const decodeUri = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return decodeURIComponent(str);
	}
};

function urlEncode(this: unknown, ...args: unknown[]) {
	return encodeUri.apply(this, args as [unknown]);
}

function urlDecode(this: unknown, ...args: unknown[]) {
	return decodeUri.apply(this, args as [unknown]);
}

const stripQuerystring = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return str.split("?")[0];
	}
};

export const helpers: Helper[] = [
	{
		name: "encodeURI",
		category: "url",
		compatibility: all,
		fn: encodeUri as any,
	},
	{
		name: "decodeURI",
		category: "url",
		compatibility: all,
		fn: decodeUri as any,
	},
	{
		name: "url_encode",
		category: "url",
		compatibility: all,
		fn: urlEncode as any,
	},
	{
		name: "url_decode",
		category: "url",
		compatibility: all,
		fn: urlDecode as any,
	},
	{
		name: "stripQuerystring",
		category: "url",
		compatibility: all,
		fn: stripQuerystring as any,
	},
];

export {
	decodeUri as decodeURI,
	encodeUri as encodeURI,
	stripQuerystring,
	urlDecode,
	urlEncode,
};
