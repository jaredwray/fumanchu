import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Writr } from 'docula';
import type { DoculaOptions } from 'docula';

export const options: Partial<DoculaOptions> = {
	githubPath: 'jaredwray/fumanchu',
	siteTitle: 'Fumanchu',
	siteDescription: 'Handlebars + Helpers Together',
	siteUrl: 'https://fumanchu.org',
	autoReadme: false,
	themeMode: 'light',
};

export const onPrepare = async (config: DoculaOptions, console: any) => {
	const readmePath = path.join(process.cwd(), './README.md');
	const readmeSitePath = path.join(config.sitePath, 'docs/', 'index.md');
	const readme = await fs.promises.readFile(readmePath, 'utf8');
	const updatedReadme = readme.replace(/!\[Fumanchu\]\(site\/logo\.svg\s+"Fumanchu"\)\r?\n\r?\n/, '');

	const writr = new Writr(updatedReadme);

	writr.frontMatter = {
		title: 'Getting Started',
		description: 'Fumanchu Getting Started Guide',
		order: 1,
	};

	console.log('writing updated readme to', readmeSitePath);
	await fs.promises.writeFile(readmeSitePath, writr.content);
};
