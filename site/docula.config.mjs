import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Writr } from 'docula';

export const options = {
	githubPath: 'jaredwray/fumanchu',
	siteTitle: 'Fumanchu',
	siteDescription: 'Handlebars + Helpers Together',
	siteUrl: 'https://fumanchu.org',
};

export const onPrepare = async config => {
	const readmePath = path.join(process.cwd(), './README.md');
	const readmeSitePath = path.join(config.sitePath, 'docs/', 'index.md');
	const readme = await fs.promises.readFile(readmePath, 'utf8');
	let updatedReadme = readme.replace('![Fumanchu](site/logo.svg "Fumanchu")\n\n', '');

	const writr = new Writr(updatedReadme);

	let frontMatter = {};
	frontMatter.title = 'Getting Started';
	frontMatter.description = 'Fumanchu Getting Started Guide';
	frontMatter.order = 1;

	writr.frontMatter = frontMatter;

	console.log('writing updated readme to', readmeSitePath);
	await fs.promises.writeFile(readmeSitePath, writr.content);
};
