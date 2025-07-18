/* eslint-disable @typescript-eslint/no-unsafe-call */
import {describe, test, expect} from 'vitest';
import {HelperRegistry, HelperRegistryCompatibility} from '../src/helper-registry.js';

describe('HelperRegistry', () => {
	test('should have helpers', () => {
		const registry = new HelperRegistry();
		expect(registry).toBeDefined();
	});
});

describe('HelperRegistry Register', () => {
	test('should register a helper', () => {
		const registry = new HelperRegistry();
		registry.register({
			name: 'test',
			category: 'test',
			fn: () => 'test',
		});
		expect(registry.has('test')).toBeTruthy();
	});

	test('should not register a helper twice', () => {
		const registry = new HelperRegistry();
		const helper = {
			name: 'test',
			category: 'test',
			fn: () => 'test',
		};
		registry.register(helper);
		expect(registry.register(helper)).toBeFalsy();
	});
});

describe('HelperRegistry Filter', () => {
	test('should return nothing filter by name', () => {
		const registry = new HelperRegistry();
		registry.register({
			name: 'test',
			category: 'test',
			fn: () => 'test',
		});
		expect(registry.filter({name: 'test1'}).length).toBe(0);
	});
	test('should filter by name', () => {
		const registry = new HelperRegistry();
		registry.register({
			name: 'test',
			category: 'test',
			fn: () => 'test',
		});
		expect(registry.filter({name: 'test'}).length).toBe(1);
	});
	test('should filter by category', () => {
		const registry = new HelperRegistry();
		registry.register({
			name: 'test',
			category: 'test',
			fn: () => 'test',
		});
		registry.register({
			name: 'test2',
			category: 'test2',
			fn: () => 'test2',
		});
		expect(registry.filter({category: 'test'}).length).toBe(1);
	});

	test('should filter by compatibility', () => {
		const registry = new HelperRegistry();
		registry.register({
			name: 'test',
			category: 'test',
			compatibility: HelperRegistryCompatibility.BROWSER,
			fn: () => 'test',
		});
		expect(registry.filter({compatibility: HelperRegistryCompatibility.BROWSER}).length).toBe(1);
	});
});

