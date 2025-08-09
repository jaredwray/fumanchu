import type { Helper } from "../helper-registry.js";

const isNumeric = (value: unknown): value is number =>
	typeof value === "number" && !Number.isNaN(value);

const bytes = (value: unknown, precision?: unknown): string => {
	if (value == null) return "0 B";

	let num: number;
	if (typeof value === "string") {
		num = value.length;
		if (!num) return "0 B";
	} else if (isNumeric(value)) {
		num = Number(value);
	} else if (typeof (value as { length?: number }).length === "number") {
		num = (value as { length: number }).length;
		if (!num) return "0 B";
	} else {
		return "0 B";
	}

	const prec =
		typeof precision === "number" && !Number.isNaN(precision) ? precision : 2;
	const abbr = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const factor = 10 ** prec;

	for (let i = abbr.length - 1; i >= 0; i--) {
		const size = 10 ** (i * 3);
		if (size <= num + 1) {
			const val = Math.round((num * factor) / size) / factor;
			return `${val} ${abbr[i]}`;
		}
	}

	return `${num}`;
};

const addCommas = (num: number | string): string =>
	num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

const phoneNumber = (num: number | string): string => {
	const str = num.toString();
	return `(${str.substr(0, 3)}) ${str.substr(3, 3)}-${str.substr(6, 4)}`;
};

const toAbbr = (value: unknown, precision?: unknown): string => {
	const num = isNumeric(value) ? Number(value) : 0;
	const prec =
		typeof precision === "number" && !Number.isNaN(precision) ? precision : 2;
	const factor = 10 ** prec;
	const abbr = ["k", "m", "b", "t", "q"];

	for (let i = abbr.length - 1; i >= 0; i--) {
		const size = 10 ** ((i + 1) * 3);
		if (size <= num + 1) {
			const val = Math.round((num * factor) / size) / factor;
			return `${val}${abbr[i]}`;
		}
	}
	return `${num}`;
};

const toExponential = (value: unknown, digits?: unknown): string => {
	const num = isNumeric(value) ? Number(value) : 0;
	const d = typeof digits === "number" && !Number.isNaN(digits) ? digits : 0;
	return Number(num).toExponential(d);
};

const toFixed = (value: unknown, digits?: unknown): string => {
	const num = isNumeric(value) ? Number(value) : 0;
	const d = typeof digits === "number" && !Number.isNaN(digits) ? digits : 0;
	return Number(num).toFixed(d);
};

const toFloat = (value: unknown): number => parseFloat(String(value));

const toInt = (value: unknown): number => parseInt(String(value), 10);

const toPrecision = (value: unknown, precision?: unknown): string => {
	const num = isNumeric(value) ? Number(value) : 0;
	const prec =
		typeof precision === "number" && !Number.isNaN(precision) ? precision : 1;
	return Number(num).toPrecision(prec);
};

export const helpers: Helper[] = [
	{ name: "bytes", category: "number", fn: bytes },
	{ name: "addCommas", category: "number", fn: addCommas },
	{ name: "phoneNumber", category: "number", fn: phoneNumber },
	{ name: "toAbbr", category: "number", fn: toAbbr },
	{ name: "toExponential", category: "number", fn: toExponential },
	{ name: "toFixed", category: "number", fn: toFixed },
	{ name: "toFloat", category: "number", fn: toFloat },
	{ name: "toInt", category: "number", fn: toInt },
	{ name: "toPrecision", category: "number", fn: toPrecision },
];

export {
	bytes,
	addCommas,
	phoneNumber,
	toAbbr,
	toExponential,
	toFixed,
	toFloat,
	toInt,
	toPrecision,
};
