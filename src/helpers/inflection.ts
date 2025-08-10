import type { Helper } from "../helper-registry.js";

const inflect = (
	count: number,
	singular: string,
	plural: string,
	includeCount?: boolean,
): string => {
	const word = count > 1 || count === 0 ? plural : singular;
	return includeCount ? `${count} ${word}` : word;
};

const ordinalize = (value: number | string): string => {
	const num = Math.abs(Math.round(Number(value)));
	const str = String(value);
	const res = num % 100;

	if ([11, 12, 13].includes(res)) {
		return `${str}th`;
	}

	switch (num % 10) {
		case 1:
			return `${str}st`;
		case 2:
			return `${str}nd`;
		case 3:
			return `${str}rd`;
		default:
			return `${str}th`;
	}
};

export const helpers: Helper[] = [
	{
		name: "inflect",
		category: "inflection",
		compatibility: ["browser", "nodejs"],
		fn: inflect,
	},
	{
		name: "ordinalize",
		category: "inflection",
		compatibility: ["browser", "nodejs"],
		fn: ordinalize,
	},
];

export { inflect, ordinalize };
