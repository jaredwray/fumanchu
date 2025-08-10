import type { Helper } from "../helper-registry.js";

const isNumeric = (value: unknown): value is number | string =>
	(typeof value === "number" && !Number.isNaN(value)) ||
	(typeof value === "string" &&
		value.trim() !== "" &&
		!Number.isNaN(Number(value)));

const toNumber = (value: unknown, message = "expected a number"): number => {
	if (isNumeric(value)) {
		return Number(value);
	}
	throw new TypeError(message);
};

const abs = (value: unknown): number => {
	const num = toNumber(value);
	return Math.abs(num);
};

const add = (a: unknown, b: unknown): number | "" => {
	if (isNumeric(a) && isNumeric(b)) {
		return Number(a) + Number(b);
	}
	return "";
};

const avg = (...values: Array<number | number[]>): number => {
	const flat: number[] = values.flat().map((n) => Number(n));
	return sum(flat) / flat.length;
};

const ceil = (value: unknown): number => {
	const num = toNumber(value);
	return Math.ceil(num);
};

const divide = (a: unknown, b: unknown): number => {
	const numA = toNumber(a, "expected the first argument to be a number");
	const numB = toNumber(b, "expected the second argument to be a number");
	return numA / numB;
};

const floor = (value: unknown): number => {
	const num = toNumber(value);
	return Math.floor(num);
};

const minus = (a: unknown, b: unknown): number => {
	const numA = toNumber(a, "expected the first argument to be a number");
	const numB = toNumber(b, "expected the second argument to be a number");
	return numA - numB;
};

const modulo = (a: unknown, b: unknown): number => {
	const numA = toNumber(a, "expected the first argument to be a number");
	const numB = toNumber(b, "expected the second argument to be a number");
	return numA % numB;
};

const multiply = (a: unknown, b: unknown): number => {
	const numA = toNumber(a, "expected the first argument to be a number");
	const numB = toNumber(b, "expected the second argument to be a number");
	return numA * numB;
};

const plus = (a: unknown, b: unknown): number => {
	const numA = toNumber(a, "expected the first argument to be a number");
	const numB = toNumber(b, "expected the second argument to be a number");
	return numA + numB;
};

const random = (min: unknown, max: unknown): number => {
	const minNum = toNumber(min, "expected minimum to be a number");
	const maxNum = toNumber(max, "expected maximum to be a number");
	return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
};

const remainder = (a: number, b: number): number => a % b;

const round = (value: unknown): number => {
	const num = toNumber(value);
	return Math.round(num);
};

const subtract = (a: unknown, b: unknown): number => {
	const numA = toNumber(a, "expected the first argument to be a number");
	const numB = toNumber(b, "expected the second argument to be a number");
	return numA - numB;
};

const sum = (...values: Array<number | number[]>): number => {
	const flat = values.flat();
	let total = 0;
	for (const value of flat) {
		if (isNumeric(value)) {
			total += Number(value);
		}
	}
	return total;
};

const times = (a: unknown, b: unknown): number => multiply(a, b);

export const helpers: Helper[] = [
	{
		name: "abs",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: abs,
	},
	{
		name: "add",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: add,
	},
	{
		name: "avg",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: avg,
	},
	{
		name: "ceil",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: ceil,
	},
	{
		name: "divide",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: divide,
	},
	{
		name: "floor",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: floor,
	},
	{
		name: "minus",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: minus,
	},
	{
		name: "modulo",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: modulo,
	},
	{
		name: "multiply",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: multiply,
	},
	{
		name: "plus",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: plus,
	},
	{
		name: "random",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: random,
	},
	{
		name: "remainder",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: remainder,
	},
	{
		name: "round",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: round,
	},
	{
		name: "subtract",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: subtract,
	},
	{
		name: "sum",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: sum,
	},
	{
		name: "times",
		category: "math",
		compatibility: ["browser", "nodejs"],
		fn: times,
	},
];

export {
	abs,
	add,
	avg,
	ceil,
	divide,
	floor,
	minus,
	modulo,
	multiply,
	plus,
	random,
	remainder,
	round,
	subtract,
	sum,
	times,
};
