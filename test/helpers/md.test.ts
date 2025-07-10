/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import type Handlebars from 'handlebars';
import {describe, it, expect} from 'vitest';
import {helpers} from '../../src/helpers/md.js';

describe('md helper', () => {
	it('should have an "md" helper with the correct properties', () => {
		const mdHelper = helpers.find(helper => helper.name === 'md');
		expect(mdHelper).toBeDefined();
		expect(mdHelper?.category).toBe('markdown');
		expect(typeof mdHelper?.fn).toBe('function');
	});

	it('should render markdown string to HTML', () => {
		const mdHelper = helpers.find(helper => helper.name === 'md');
		const result = mdHelper?.fn('# Title') as Handlebars.SafeString;
		expect(result.toHTML()).toBe('<h1>Title</h1>\n');
	});

	it('should render markdown from a file path', () => {
		const mdHelper = helpers.find(helper => helper.name === 'md');
		const temporaryDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdtest-'));
		const file = path.join(temporaryDir, 'sample.md');
		fs.writeFileSync(file, '# File');
		const result = mdHelper?.fn(file) as Handlebars.SafeString;
		expect(result.toHTML()).toBe('<h1>File</h1>\n');
		fs.rmSync(temporaryDir, {recursive: true, force: true});
	});
});
