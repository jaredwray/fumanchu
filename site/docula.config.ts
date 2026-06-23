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
	headerLinks: [
		{
			label: 'GitHub',
			url: 'https://github.com/jaredwray/fumanchu',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="order:1" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
		},
	],
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
