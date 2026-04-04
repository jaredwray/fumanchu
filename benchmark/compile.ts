import { faker } from "@faker-js/faker";
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer";
import { Bench } from "tinybench";
import pkg from "../package.json" with { type: "json" };
import { fumanchu } from "../src/index.js";

const ITERATIONS = 10_000;
const TEMPLATE_COUNT = 2_000;
const bench = new Bench({ name: "compile", iterations: ITERATIONS });

// Template fragments that use fumanchu helpers
const fragments = [
	"Hello {{uppercase name}}!",
	"Welcome {{capitalize name}} from {{lowercase city}}.",
	"Contact: {{lowercase email}}",
	"Company: {{uppercase company}}",
	"{{camelcase name}} - {{dashcase city}}",
	"{{snakecase company}} ({{ellipsis city 10}})",
	"{{reverse name}} | {{capitalize city}}",
	"{{trim name}} at {{pascalcase company}}",
	"{{truncate name 5}} - {{sentence city}}",
	"{{prepend name \"Mr. \"}} from {{append city \", USA\"}}",
];

// Pre-generate 2,000 unique templates by combining random fragments
const templates = Array.from({ length: TEMPLATE_COUNT }, () => {
	const count = faker.number.int({ min: 2, max: 4 });
	const selected = faker.helpers.arrayElements(fragments, count);
	return `${selected.join(" | ")} [${faker.string.alphanumeric(6)}]`;
});

// Pre-generate 10,000 data objects
const data = Array.from({ length: ITERATIONS }, () => ({
	name: faker.person.fullName(),
	city: faker.location.city(),
	email: faker.internet.email(),
	company: faker.company.name(),
}));

// Pre-generate random template indices so both benchmarks use the same order
const templateIndices = Array.from({ length: ITERATIONS }, () =>
	Math.floor(Math.random() * TEMPLATE_COUNT),
);

// Fumanchu instances
const hbsNoCache = fumanchu();
const hbsCached = fumanchu({ caching: true });

let noCacheIndex = 0;
bench.add(`compile+render no-cache (v${pkg.version})`, () => {
	const i = noCacheIndex % ITERATIONS;
	const tmpl = templates[templateIndices[i]];
	const fn = hbsNoCache.compile(tmpl);
	fn(data[i]);
	noCacheIndex++;
});

let cachedIndex = 0;
bench.add(`compile+render cached (v${pkg.version})`, () => {
	const i = cachedIndex % ITERATIONS;
	const tmpl = templates[templateIndices[i]];
	const fn = hbsCached.compile(tmpl);
	fn(data[i]);
	cachedIndex++;
});

await bench.run();
const output = tinybenchPrinter.toMarkdown(bench);
console.log(output);
console.log("");
