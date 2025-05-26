import {describe, it, expect} from 'vitest';
import {helpers} from '../../src/helpers/array.js';

describe('array helpers', () => {
        it('should expose the after helper', () => {
                const afterHelper = helpers.find(h => h.name === 'after');
                expect(afterHelper).toBeDefined();
                expect(afterHelper?.category).toBe('array');
                expect(typeof afterHelper?.fn).toBe('function');
        });

        it('after should return items after index', () => {
                const afterHelper = helpers.find(h => h.name === 'after');
                const fn = afterHelper?.fn as (arr: any[], n: number) => any[];
                expect(fn(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
        });

        it('arrayify should wrap non-array values', () => {
                const arrayify = helpers.find(h => h.name === 'arrayify')?.fn as (v: any) => any[];
                expect(arrayify('foo')).toEqual(['foo']);
                expect(arrayify(['foo'])).toEqual(['foo']);
        });

        it('isArray should detect arrays', () => {
                const isArray = helpers.find(h => h.name === 'isArray')?.fn as (v: any) => boolean;
                expect(isArray([])).toBe(true);
                expect(isArray('foo')).toBe(false);
        });

        it('join should join arrays', () => {
                const join = helpers.find(h => h.name === 'join')?.fn as (arr: any[], sep?: string) => string;
                expect(join(['a', 'b', 'c'], ',')).toBe('a,b,c');
        });

        it('unique should remove duplicate values', () => {
                const unique = helpers.find(h => h.name === 'unique')?.fn as (arr: any[]) => any[];
                expect(unique(['a','a','b','b','c'])).toEqual(['a','b','c']);
        });
});
