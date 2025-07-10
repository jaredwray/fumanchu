/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {Remarkable} from 'remarkable';
import {decode} from 'ent';
import {type Helper} from '../helper-registry.js';

const renderMarkdown = (input: string, options: {cwd?: string} = {}): string => {
	const options_ = {cwd: process.cwd(), ...options};
	const md = new Remarkable({
		breaks: true,
		html: true,
		langPrefix: 'lang-',
		typographer: false,
		xhtmlOut: false,
	});

	const filepath = path.resolve(options_.cwd, input);
	let string_ = input;
	if (fs.existsSync(filepath)) {
		string_ = fs.readFileSync(filepath, 'utf8');
	}

	return decode(md.render(string_));
};

export const helpers: Helper[] = [
	{
		name: 'md',
		category: 'markdown',
		fn: renderMarkdown,
	},
];
