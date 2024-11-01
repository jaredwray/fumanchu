import {type Helper} from '../helper-registry.js';

const year = () => new Date().getFullYear();

export const helpers: Helper[] = [
	{
		name: 'year',
		category: 'date',
		fn: year,
	},
];
