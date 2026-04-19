import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Writr } from 'docula';
import type { DoculaOptions } from 'docula';
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const options: Partial<DoculaOptions> = {
	githubPath: 'jaredwray/fumanchu',
	siteTitle: 'Fumanchu',
	siteDescription: 'Handlebars + Helpers Together',
	siteUrl: 'https://fumanchu.org',
	autoReadme: false,
	themeMode: 'light',
	ai: {
		provider: 'openai',
		model: 'gpt-4o-mini',
		apiKey: process.env.OPENAI_API_KEY,
	},
	sections: [
		{ path: 'helpers', name: 'Helpers', order: 998 },
		{ path: 'migration', name: 'Migration', order: 999 },
		{ path: 'project-guidelines', name: 'Project Guidelines', order: 1000 },
	],
};

const projectGuidelines = [
	{
		source: 'CONTRIBUTING.md',
		dest: 'contributing.md',
		title: 'Contributing',
		description: 'How to contribute to Fumanchu.',
		order: 1,
	},
	{
		source: 'SECURITY.md',
		dest: 'security.md',
		title: 'Security Policy',
		description: 'How to report security vulnerabilities in Fumanchu.',
		order: 2,
	},
	{
		source: 'CODE_OF_CONDUCT.md',
		dest: 'code-of-conduct.md',
		title: 'Code of Conduct',
		description: 'Contributor Covenant Code of Conduct for the Fumanchu community.',
		order: 3,
	},
	{
		source: 'LICENSE',
		dest: 'license-and-copyright.md',
		title: 'License and Copyright',
		description: 'Fumanchu MIT license and copyright notice.',
		order: 4,
	},
];

export const onPrepare = async (config: DoculaOptions, console: any) => {
	const readmePath = path.join(process.cwd(), './README.md');
	const readmeSitePath = path.join(config.sitePath, 'docs/', 'index.md');
	const readme = await fs.promises.readFile(readmePath, 'utf8');
	const updatedReadme = readme
		.replace(/!\[Fumanchu\]\(site\/logo\.svg\s+"Fumanchu"\)\r?\n\r?\n/, '')
		.replace(/\]\(CONTRIBUTING\.md\)/g, '](/docs/project-guidelines/contributing/)')
		.replace(/\]\(LICENSE\)/g, '](/docs/project-guidelines/license-and-copyright/)')
		.replace(/\r?\n\* \[How to Contribute\]\(#how-to-contribute\)\r?\n\* \[License and Copyright\]\(#license-and-copyright\)/, '')
		.replace(/\r?\n## How to Contribute[\s\S]*$/, '\n');

	const writr = new Writr(updatedReadme);

	writr.frontMatter = {
		title: 'Getting Started',
		description: 'Fumanchu Getting Started Guide',
		order: 1,
	};

	console.info(`writing updated readme to ${path.relative(process.cwd(), readmeSitePath)}`);
	await fs.promises.writeFile(readmeSitePath, writr.content);

	const guidelinesDir = path.join(config.sitePath, 'docs/', 'project-guidelines/');
	await fs.promises.mkdir(guidelinesDir, { recursive: true });

	for (const g of projectGuidelines) {
		const sourcePath = path.join(process.cwd(), g.source);
		const destPath = path.join(guidelinesDir, g.dest);
		const raw = await fs.promises.readFile(sourcePath, 'utf8');
		const rewritten = raw.replace(/\]\(CODE_OF_CONDUCT\.md\)/g, '](./code-of-conduct.md)');
		const guidelineWritr = new Writr(rewritten);
		guidelineWritr.frontMatter = {
			title: g.title,
			description: g.description,
			order: g.order,
		};
		console.info(`writing project guideline to ${path.relative(process.cwd(), destPath)}`);
		await fs.promises.writeFile(destPath, guidelineWritr.content);
	}
};
