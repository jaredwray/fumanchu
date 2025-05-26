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

const get = (obj: any, path: string): any => {
        if (!obj || typeof path !== 'string') {
                return undefined;
        }
        return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

const after = (array: any[], n: number): any[] => {
        if (!Array.isArray(array)) return [];
        return array.slice(n);
};

const arrayify = (value: any): any[] => {
        return value ? (Array.isArray(value) ? value : [value]) : [];
};

const before = (array: any[], n: number): any[] => {
        if (!Array.isArray(array)) return [];
        return array.slice(0, -n);
};

const eachIndex = (array: any[], options: any): string => {
        if (!Array.isArray(array)) return '';
        let result = '';
        for (let i = 0; i < array.length; i++) {
                result += options.fn({item: array[i], index: i});
        }
        return result;
};

interface FilterHash { property?: string; prop?: string; }
const filter = (array: any[], value: any, options: any): string => {
        if (!Array.isArray(array)) return options.inverse(this);
        const hash: FilterHash = options.hash || {};
        const prop = hash.property || hash.prop;
        const results = prop
                ? array.filter((val) => value === get(val, prop))
                : array.filter((v) => value === v);
        if (results.length > 0) {
                return results.map((r: any) => options.fn(r)).join('');
        }
        return options.inverse(this);
};

const first = (array: any[], n?: number): any => {
        if (!Array.isArray(array)) return '';
        if (!isNumber(n)) {
                return array[0];
        }
        return array.slice(0, n);
};

const forEach = (array: any[], options: any): string => {
        if (!Array.isArray(array)) return '';
        const len = array.length;
        let buffer = '';
        for (let i = 0; i < len; i++) {
                const item = array[i];
                const data = {
                        index: i,
                };
                item.index = i + 1;
                item.total = len;
                item.isFirst = i === 0;
                item.isLast = i === len - 1;
                buffer += options.fn(item, {data});
        }
        return buffer;
};

const inArray = (array: any[], value: any, options: any): any => {
        const found = Array.isArray(array) && array.indexOf(value) > -1;
        if (options && typeof options.fn === 'function') {
                return found ? options.fn(this) : options.inverse(this);
        }
        return found;
};

const isArray = (value: any): boolean => Array.isArray(value);

const itemAt = (array: any[], idx?: number): any => {
        if (!Array.isArray(array)) return null;
        const i = isNumber(idx) ? Number(idx) : 0;
        if (i < 0) {
                return array[array.length + i];
        }
        return array[i];
};

const join = (array: any[] | string, separator?: string): string => {
        if (typeof array === 'string') return array;
        if (!Array.isArray(array)) return '';
        const sep = typeof separator === 'string' ? separator : ', ';
        return array.join(sep);
};

const equalsLength = (value: any[] | string, length: number, options?: any): any => {
        const len = (Array.isArray(value) || typeof value === 'string') ? value.length : 0;
        const result = len === length;
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
        const arr = value as any[] | string;
        return arr.slice(-Math.abs(Number(n)));
};

const length = (value: any): number => {
        if (typeof value === 'string' || Array.isArray(value)) {
                return value.length;
        }
        if (typeof value === 'object' && value !== null) {
                return Object.keys(value).length;
        }
        return 0;
};

const lengthEqual = equalsLength;

const mapHelper = (array: any[], iter: (value: any, index: number, array: any[]) => any): any => {
        if (!Array.isArray(array)) return '';
        if (typeof iter !== 'function') {
                return array;
        }
        return array.map(iter);
};

const pluck = (arr: any[], prop: string): any[] => {
        if (!Array.isArray(arr)) return [];
        const res: any[] = [];
        for (let i = 0; i < arr.length; i++) {
                const val = get(arr[i], prop);
                if (typeof val !== 'undefined') {
                        res.push(val);
                }
        }
        return res;
};

const reverse = (val: any[] | string): any => {
        if (Array.isArray(val)) {
                return [...val].reverse();
        }
        if (typeof val === 'string') {
                return val.split('').reverse().join('');
        }
        return val;
};

const some = (array: any[], iter: (value: any, index: number, array: any[]) => boolean, options: any): string => {
        if (Array.isArray(array)) {
                for (let i = 0; i < array.length; i++) {
                        if (iter(array[i], i, array)) {
                                return options.fn(this);
                        }
                }
        }
        return options.inverse(this);
};

const sort = (array: any[], options: any): any[] | string => {
        if (!Array.isArray(array)) return '';
        const result = [...array].sort();
        if (options && options.hash && options.hash.reverse) {
                return result.reverse();
        }
        return result;
};

const sortBy = (array: any[], prop: any, options: any): any[] | string => {
        if (!Array.isArray(array)) return '';
        const args = Array.prototype.slice.call(arguments, 0);
        args.pop();
        if (typeof prop !== 'string' && typeof prop !== 'function') {
                return [...array].sort();
        }
        if (typeof prop === 'function') {
                return [...array].sort(prop);
        }
        return [...array].sort((a, b) => {
                const va = get(a, prop);
                const vb = get(b, prop);
                if (va > vb) return 1;
                if (va < vb) return -1;
                return 0;
        });
};

const withAfter = (array: any[], idx: number, options: any): string => {
        if (!Array.isArray(array)) return '';
        array = array.slice(idx);
        let result = '';
        for (const item of array) {
                result += options.fn(item);
        }
        return result;
};

const withBefore = (array: any[], idx: number, options: any): string => {
        if (!Array.isArray(array)) return '';
        array = array.slice(0, -idx);
        let result = '';
        for (const item of array) {
                result += options.fn(item);
        }
        return result;
};

const withFirst = (array: any[], idx: number | undefined, options: any): string => {
        if (!Array.isArray(array)) return '';
        if (!isNumber(idx)) {
                return options.fn(array[0]);
        }
        array = array.slice(0, idx);
        let result = '';
        for (const item of array) {
                result += options.fn(item);
        }
        return result;
};

const withGroup = (array: any[], size: number, options: any): string => {
        let result = '';
        if (Array.isArray(array) && array.length > 0) {
                let sub: any[] = [];
                for (let i = 0; i < array.length; i++) {
                        if (i > 0 && i % size === 0) {
                                result += options.fn(sub);
                                sub = [];
                        }
                        sub.push(array[i]);
                }
                result += options.fn(sub);
        }
        return result;
};

const withLast = (array: any[], idx: number | undefined, options: any): string => {
        if (!Array.isArray(array)) return '';
        if (!isNumber(idx)) {
                return options.fn(array[array.length - 1]);
        }
        array = array.slice(-idx);
        let result = '';
        for (const item of array) {
                result += options.fn(item);
        }
        return result;
};

const withSort = (array: any[], prop: any, options: any): string => {
        if (!Array.isArray(array)) return '';
        let arr: any[];
        if (typeof prop === 'undefined') {
                arr = [...array].sort();
                if (options && options.hash && options.hash.reverse) {
                        arr = arr.reverse();
                }
        } else {
                arr = [...array].sort((a, b) => {
                        const va = get(a, prop);
                        const vb = get(b, prop);
                        if (va > vb) return 1;
                        if (va < vb) return -1;
                        return 0;
                });
                if (options && options.hash && options.hash.reverse) {
                        arr = arr.reverse();
                }
        }
        return arr.map((v) => options.fn(v)).join('');
};

const unique = (array: any[]): any[] => {
        if (!Array.isArray(array)) return [];
        return array.filter((item, index, arr) => arr.indexOf(item) === index);
};

export const helpers: Helper[] = [
        { name: 'after', category: 'array', fn: after },
        { name: 'arrayify', category: 'array', fn: arrayify },
        { name: 'before', category: 'array', fn: before },
        { name: 'eachIndex', category: 'array', fn: eachIndex },
        { name: 'filter', category: 'array', fn: filter },
        { name: 'first', category: 'array', fn: first },
        { name: 'forEach', category: 'array', fn: forEach },
        { name: 'inArray', category: 'array', fn: inArray },
        { name: 'isArray', category: 'array', fn: isArray },
        { name: 'itemAt', category: 'array', fn: itemAt },
        { name: 'join', category: 'array', fn: join },
        { name: 'equalsLength', category: 'array', fn: equalsLength },
        { name: 'last', category: 'array', fn: last },
        { name: 'length', category: 'array', fn: length },
        { name: 'lengthEqual', category: 'array', fn: lengthEqual },
        { name: 'map', category: 'array', fn: mapHelper },
        { name: 'pluck', category: 'array', fn: pluck },
        { name: 'reverse', category: 'array', fn: reverse },
        { name: 'some', category: 'array', fn: some },
        { name: 'sort', category: 'array', fn: sort },
        { name: 'sortBy', category: 'array', fn: sortBy },
        { name: 'withAfter', category: 'array', fn: withAfter },
        { name: 'withBefore', category: 'array', fn: withBefore },
        { name: 'withFirst', category: 'array', fn: withFirst },
        { name: 'withGroup', category: 'array', fn: withGroup },
        { name: 'withLast', category: 'array', fn: withLast },
        { name: 'withSort', category: 'array', fn: withSort },
        { name: 'unique', category: 'array', fn: unique },
];
