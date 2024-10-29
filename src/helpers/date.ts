import {Helper} from '../helper-registry.js';

const year = () => new Date().getFullYear();

export const helpers: Array<Helper> = [
	{
		name: 'year',
		category: 'date',
		fn: year,
	},
];