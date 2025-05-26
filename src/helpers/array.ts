/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import {type Helper} from '../helper-registry.js';

// Utility helpers
const isNumber = (value: unknown): value is number => {
	if (typeof value === 'number') {
		return !Number.isNaN(value);
	}

	if (typeof value === 'string' && value.trim() !== '') {
		return !Number.isNaN(Number(value));
	}

	return false;
};

const get = (object: any, path: string): any => {
	if (!object || typeof path !== 'string') {
		return undefined;
	}

	// eslint-disable-next-line unicorn/no-array-reduce
	return path.split('.').reduce((accumulator, key) => (accumulator ? accumulator[key] : undefined), object);
};

const after = (array: any[], n: number, options?: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	const result = array.slice(n);
	if (options && typeof options.fn === 'function') {
		return result.map((item: any) => options.fn(item)).join('');
	}

	return result.join(', ');
};

const arrayify = (value: any): string => {
	const arr = value ? (Array.isArray(value) ? value : [value]) : [];
	return arr.join(', ');
};

const before = (array: any[], n: number): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	return array.slice(0, -n).join(', ');
};

const eachIndex = (array: any[], options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	let result = '';
	for (const [i, element] of array.entries()) {
		result += options.fn({item: element, index: i}) as string;
	}

	return result;
};

type FilterHash = {
	property?: string; prop?: string;
};
const filter = (array: any[], value: any, options: any): string => {
	if (!Array.isArray(array)) {
		return options.inverse(this);
	}

	const hash: FilterHash = options.hash || {};
	const property = hash.property ?? hash.prop;
	const results = property
		? array.filter(value_ => value === get(value_, property))
		: array.filter(v => value === v);
	if (results.length > 0) {
		return results.map((r: any) => options.fn(r)).join('');
	}

	return options.inverse(this);
};

const first = (array: any[], n?: number): any => {
	if (!Array.isArray(array)) {
		return '';
	}

	if (!isNumber(n)) {
		return array[0];
	}

	return array.slice(0, n);
};

const forEach = (array: any[], options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	const length_ = array.length;
	let buffer = '';
	for (let i = 0; i < length_; i++) {
		const item = array[i];
		const data = {
			index: i,
		};
		item.index = i + 1;
		item.total = length_;
		item.isFirst = i === 0;
		item.isLast = i === length_ - 1;
		buffer += options.fn(item, {data}) as string;
	}

	return buffer;
};

const inArray = (array: any[], value: any, options: any): any => {
	const found = Array.isArray(array) && array.includes(value);
	if (options && typeof options.fn === 'function') {
		return found ? options.fn(this) : options.inverse(this);
	}

	return found;
};

const isArray = (value: any): string => Array.isArray(value).toString();

const itemAt = (array: any[], index?: number): any => {
	if (!Array.isArray(array)) {
		return null;
	}

	const i = isNumber(index) ? Number(index) : 0;
	if (i < 0) {
		return array[array.length + i];
	}

	return array[i];
};

const join = (array: any[] | string, separator?: string): string => {
	if (typeof array === 'string') {
		return array;
	}

	if (!Array.isArray(array)) {
		return '';
	}

	const separator_ = typeof separator === 'string' ? separator : ', ';
	return array.join(separator_);
};

const equalsLength = (value: any[] | string, length: number, options?: any): any => {
	const length_ = (Array.isArray(value) || typeof value === 'string') ? value.length : 0;
	const result = length_ === length;
	if (options && typeof options.fn === 'function') {
		return result ? options.fn(this) : options.inverse(this);
	}

	return String(result);
};

const last = (value: any[] | string, n?: number): any => {
	if (!Array.isArray(value) && typeof value !== 'string') {
		return '';
	}

	if (!isNumber(n)) {
		return (value as any)[(value as any).length - 1];
	}

	const array = value;
	return array.slice(-Math.abs(Number(n)));
};

const length = (value: any): string => {
	if (typeof value === 'string' || Array.isArray(value)) {
		return value.length.toString();
	}

	if (typeof value === 'object' && value !== null) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return Object.keys(value).length.toString();
	}

	return '0';
};

const lengthEqual = equalsLength;

const mapHelper = (array: any[], iterator: (value: any, index: number, array: any[]) => any): any => {
	if (!Array.isArray(array)) {
		return '';
	}

	if (typeof iterator !== 'function') {
		return array;
	}

	// eslint-disable-next-line unicorn/no-array-callback-reference
	return array.map(iterator);
};

const pluck = (array: any[], property: string): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	// eslint-disable-next-line unicorn/prevent-abbreviations
	const res: any[] = [];
	for (const element of array) {
		const value = get(element, property);
		if (value !== undefined) {
			res.push(value);
		}
	}

	return res.join(', ');
};

const reverse = (value: any[] | string): any => {
	if (Array.isArray(value)) {
		return [...value].reverse();
	}

	if (typeof value === 'string') {
		return value.split('').reverse().join('');
	}

	return value;
};

const some = (array: any[], iterator: (value: any, index: number, array: any[]) => boolean, options: any): string => {
	if (Array.isArray(array)) {
		for (let i = 0; i < array.length; i++) {
			if (iterator(array[i], i, array)) {
				return options.fn(this);
			}
		}
	}

	return options.inverse(this);
};

const sort = (array: any[], options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
	let result = [...array].sort();
	if (options?.hash?.reverse) {
		result = result.reverse();
	}

	return result.join(', ');
};

const sortBy = (array: any[], property: any, options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	const arguments_ = Array.prototype.slice.call(options, 0);
	arguments_.pop();
	let sorted: any[];
	if (typeof property !== 'string' && typeof property !== 'function') {
		// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
		sorted = [...array].sort();
	} else if (typeof property === 'function') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		sorted = [...array].sort(property);
	} else {
		sorted = [...array].sort((a, b) => {
			const va = get(a, property as string);
			const vb = get(b, property as string);
			if (va > vb) {
				return 1;
			}

			if (va < vb) {
				return -1;
			}

			return 0;
		});
	}
	return sorted.join(', ');
};

const withAfter = (array: any[], index: number, options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	array = array.slice(index);
	let result = '';
	for (const item of array) {
		result += options.fn(item) as string;
	}

	return result;
};

const withBefore = (array: any[], index: number, options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	array = array.slice(0, -index);
	let result = '';
	for (const item of array) {
		result += options.fn(item) as string;
	}

	return result;
};

const withFirst = (array: any[], index: number | undefined, options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	if (!isNumber(index)) {
		return options.fn(array[0]);
	}

	array = array.slice(0, index);
	let result = '';
	for (const item of array) {
		result += options.fn(item) as string;
	}

	return result;
};

const withGroup = (array: any[], size: number, options: any): string => {
	let result = '';
	if (Array.isArray(array) && array.length > 0) {
		let sub: any[] = [];
		for (const [i, element] of array.entries()) {
			if (i > 0 && i % size === 0) {
				result += options.fn(sub) as string;
				sub = [];
			}

			sub.push(element);
		}

		result += options.fn(sub) as string;
	}

	return result;
};

const withLast = (array: any[], index: number | undefined, options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	if (!isNumber(index)) {
		return options.fn(array[array.length - 1]);
	}

	array = array.slice(-index);
	let result = '';
	for (const item of array) {
		result += options.fn(item) as string;
	}

	return result;
};

const withSort = (array: any[], property: any, options: any): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	let array_: any[];
	if (property === undefined) {
		// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
		array_ = [...array].sort();
		if (options?.hash?.reverse) {
			array_ = array_.reverse();
		}
	} else {
		array_ = [...array].sort((a, b) => {
			const va = get(a, property as string);
			const vb = get(b, property as string);
			if (va > vb) {
				return 1;
			}

			if (va < vb) {
				return -1;
			}

			return 0;
		});
		if (options?.hash?.reverse) {
			array_ = array_.reverse();
		}
	}

	return array_.map(v => options.fn(v)).join('');
};

const unique = (array: any[]): string => {
	if (!Array.isArray(array)) {
		return '';
	}

	const uniqueArray = array.filter((item, index, array_) => array_.indexOf(item) === index);
	return uniqueArray.join(', ');
};

export const helpers: Helper[] = [
	{name: 'after', category: 'array', fn: after},
	{name: 'arrayify', category: 'array', fn: arrayify},
	{name: 'before', category: 'array', fn: before},
	{name: 'eachIndex', category: 'array', fn: eachIndex},
	{name: 'filter', category: 'array', fn: filter},
	{name: 'first', category: 'array', fn: first},
	{name: 'forEach', category: 'array', fn: forEach},
	{name: 'inArray', category: 'array', fn: inArray},
	{name: 'isArray', category: 'array', fn: isArray},
	{name: 'itemAt', category: 'array', fn: itemAt},
	{name: 'join', category: 'array', fn: join},
	{name: 'equalsLength', category: 'array', fn: equalsLength},
	{name: 'last', category: 'array', fn: last},
	{name: 'length', category: 'array', fn: length},
	{name: 'lengthEqual', category: 'array', fn: lengthEqual},
	{name: 'map', category: 'array', fn: mapHelper},
	{name: 'pluck', category: 'array', fn: pluck},
	{name: 'reverse', category: 'array', fn: reverse},
	{name: 'some', category: 'array', fn: some},
	{name: 'sort', category: 'array', fn: sort},
	{name: 'sortBy', category: 'array', fn: sortBy},
	{name: 'withAfter', category: 'array', fn: withAfter},
	{name: 'withBefore', category: 'array', fn: withBefore},
	{name: 'withFirst', category: 'array', fn: withFirst},
	{name: 'withGroup', category: 'array', fn: withGroup},
	{name: 'withLast', category: 'array', fn: withLast},
	{name: 'withSort', category: 'array', fn: withSort},
	{name: 'unique', category: 'array', fn: unique},
];
