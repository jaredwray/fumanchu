const path = require('node:path');
const process = require('node:process');
const fs = require('fs-extra');

module.exports.options = {
	githubPath: 'jaredwray/fumanchu',
	siteTitle: 'Fumanchu',
	siteDescription: 'Handlebars + Helpers Together',
	siteUrl: 'https://fumanchu.org',
};

module.exports.onPrepare = async config => {
	const readmePath = path.join(process.cwd(), './README.md');
	const readmeSitePath = path.join(config.sitePath, 'README.md');
	const readme = await fs.readFile(readmePath, 'utf8');
	const updatedReadme = readme.replace('![Fumanchu](logo.png "Fumanchu")\n\n', '');
	console.log('writing updated readme to', readmeSitePath);
	await fs.writeFile(readmeSitePath, updatedReadme);
};
