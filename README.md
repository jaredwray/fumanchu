![Fumanchu](site/logo.svg "Fumanchu")


# fumanchu
Handlebars + Helpers Together

[![tests](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml/badge.svg)](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml)
[![codecov](https://codecov.io/gh/jaredwray/fumanchu/graph/badge.svg?token=gtYw78huva)](https://codecov.io/gh/jaredwray/fumanchu)
[![npm version](https://img.shields.io/npm/v/@jaredwray/fumanchu.svg)](https://npmjs.com/package/@jaredwray/fumanchu)
[![NPM License](https://img.shields.io/npm/l/%40jaredwray%2Ffumanchu)
](https://github.com/jaredwray/fumanchu/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/dm/@jaredwray/fumanchu)](https://npmjs.com/package/@jaredwray/fumanchu)
[![](https://data.jsdelivr.com/v1/package/npm/@jaredwray/fumanchu/badge)](https://www.jsdelivr.com/package/npm/@jaredwray/fumanchu)

[Handlebars](https://github.com/handlebars-lang/handlebars.js) + [Handlebars-helpers](https://github.com/helpers/handlebars-helpers) (helpers are now maintained in this project) combined into a single package. In addition this project has **drastically** reduced the number of dependencies. 

Easily use it as a drop in replacement when using handlebars directly. More than 160 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate, Verb, Ghost, gulp-handlebars, grunt-handlebars, consolidate, or any node.js/Handlebars project. Currently **189 helpers** in **20 categories**! 🎉

# Table of Contents
* [Using in Nodejs](#usage-nodejs)
* [Using in the Browser](#usage-in-the-browser)
* [Just using Handlebar Helpers](#using-handlebars-helpers)
* [Migrating from v2 to v3](https://fumanchu.org/docs/migration/v2-to-v3/)
* [Migrating from v3 to v4](https://fumanchu.org/docs/migration/v3-to-v4/)
* [Helpers](https://fumanchu.org/docs/helpers/)
  * [array](https://fumanchu.org/docs/helpers/array/)
  * [code](https://fumanchu.org/docs/helpers/code/)
  * [comparison](https://fumanchu.org/docs/helpers/comparison/)
  * [collection](https://fumanchu.org/docs/helpers/collection/)
  * [date](https://fumanchu.org/docs/helpers/date/)
  * [fs](https://fumanchu.org/docs/helpers/fs/)
  * [html](https://fumanchu.org/docs/helpers/html/)
  * [i18n](https://fumanchu.org/docs/helpers/i18n/)
  * [inflection](https://fumanchu.org/docs/helpers/inflection/)
  * [logging](https://fumanchu.org/docs/helpers/logging/)
  * [markdown](https://fumanchu.org/docs/helpers/markdown/)
  * [match](https://fumanchu.org/docs/helpers/match/)
  * [math](https://fumanchu.org/docs/helpers/math/)
  * [misc](https://fumanchu.org/docs/helpers/misc/)
  * [number](https://fumanchu.org/docs/helpers/number/)
  * [object](https://fumanchu.org/docs/helpers/object/)
  * [path](https://fumanchu.org/docs/helpers/path/)
  * [regex](https://fumanchu.org/docs/helpers/regex/)
  * [string](https://fumanchu.org/docs/helpers/string/)
  * [url](https://fumanchu.org/docs/helpers/url/)
  * [utils](https://fumanchu.org/docs/helpers/utils/)
* [Caching](#caching)
* [How to Contribute](#how-to-contribute)
* [License and Copyright](#license-and-copyright)

# Usage Nodejs

```bash
npm install @jaredwray/fumanchu --save
```

To use Handlebars with all the helpers:

```javascript
import {fumanchu} from '@jaredwray/fumanchu';
const handlebars = fumanchu(); // this will return handlebars with all the helpers
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html); // <p>Foo is bar</p>
```

It's just that easy! No need to add Handlebars to your project, it's already included.

# Usage in the Browser

Fumanchu ships a browser-safe build that excludes Node-only helpers (`fs`, `path`, `logging`, `embed`, `css`, `js`, `escape`, `urlResolve`, `urlParse`, `stripProtocol`). Import it directly via the `/browser` subpath:

```javascript
import { fumanchu } from '@jaredwray/fumanchu/browser';
const handlebars = fumanchu();
const template = handlebars.compile('{{uppercase name}}');
console.log(template({ name: 'hello' })); // HELLO
```

The package also sets the `browser` export condition on the main entry, so webpack, Vite, esbuild, Rollup, and other browser-aware bundlers automatically pick up the browser build when you `import '@jaredwray/fumanchu'` from a browser target — no code change required. The public API (`fumanchu`, `helpers`, `HelperRegistry`) is identical to Node; only the set of registered helpers differs.

You can also load the browser build directly from a CDN such as [jsDelivr](https://www.jsdelivr.com/package/npm/@jaredwray/fumanchu) — no bundler required:

```html
<script type="module">
  import { fumanchu } from 'https://cdn.jsdelivr.net/npm/@jaredwray/fumanchu/dist/index.browser.mjs';
  const handlebars = fumanchu();
  document.body.textContent = handlebars.compile('{{uppercase name}}')({ name: 'hello' });
</script>
```

# Using Handlebars Helpers

If you only want to use handlebar helpers you can easily do that by doing the following:

```javascript
import {helpers} from '@jaredwray/fumanchu';
import handlebars from 'handlebars';
const helpersFunction = await helpers();
helpersFunction({ handlebars: handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html); // <p>Foo is bar</p>
```

If using it with es6 you can access `handlebars` and `helpers`:

```javascript
import {handlebars, helpers} from '@jaredwray/fumanchu';
helpers({ handlebars: handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html);
```

# Using the Helper Registry

The helper registry allows you to manage and use Handlebars helpers more easily. You can register new helpers, filter existing ones, and access them in your templates.

```js
import { HelperRegistry, handlebars } from '@jaredwray/fumanchu';

const registry = new HelperRegistry();
registry.register('eq', (a, b) => a === b);
registry.register('if', (condition, template) => condition ? template() : '');
const hbs = handlebars;
registry.load(hbs); // Load all helpers into Handlebars
```

If you want to do filtering you can use the `HelperFilter` on `load`:

```js
import { HelperRegistry, handlebars } from '@jaredwray/fumanchu';

const registry = new HelperRegistry();
registry.register('eq', (a, b) => a === b);
registry.register('if', (condition, template) => condition ? template() : '');
const hbs = handlebars;
registry.load(hbs, { names: ['if']}); // Load the helpers into Handlebars
```

In addition, we have made the helper functions have a compatibility such as `HelperRegistryCompatibility.NODEJS` or `HelperRegistryCompatibility.BROWSER`. This will allow you to filter out based on your environment!

# Caching

When caching is enabled, Fumanchu wraps the Handlebars `compile()` method to cache compiled template functions using [@cacheable/memory](https://github.com/jaredwray/cacheable/tree/main/packages/memory). If you compile the same template string multiple times, the cached version is returned instead of recompiling. The returned Handlebars instance is fully compatible -- caching is transparent to your existing code.

The `caching` option accepts three types:
- `boolean` -- `true` enables caching with defaults, `false` disables it
- `CacheableMemory` -- a pre-configured instance from `@cacheable/memory`
- `CacheableMemoryOptions` -- an options object passed to `CacheableMemory` (supports `ttl`, `lruSize`, `checkInterval`, etc.)

Here is an quick benchmark showing the performance advantage:

|                name                |  summary  |  ops/sec  |  time/op  |  margin  |  samples  |
|------------------------------------|:---------:|----------:|----------:|:--------:|----------:|
|  compile+render cached (v4.6.0)    |    🥇     |      45K  |     39µs  |  ±0.32%  |      25K  |
|  compile+render no-cache (v4.6.0)  |   -83%    |       8K  |    166µs  |  ±0.62%  |      10K  |

## Enable caching with default settings

```javascript
import { fumanchu } from '@jaredwray/fumanchu';
const handlebars = fumanchu({ caching: true });

const template = handlebars.compile('Hello {{name}}!');
template({ name: 'World' }); // compiles and caches

const template2 = handlebars.compile('Hello {{name}}!');
// returns the cached compiled function -- no recompilation
```

## Pass caching options

```javascript
import { fumanchu } from '@jaredwray/fumanchu';
const handlebars = fumanchu({
  caching: {
    ttl: '1h',         // Time-to-live in ms or human-readable string like '1h'
    lruSize: 500,      // LRU cache size limit (0 = unlimited)
    checkInterval: 0,  // Interval to check for expired items in ms (0 = disabled)
  },
});
```

## Pass a pre-configured `CacheableMemory` instance

This is useful if you want to share a cache across multiple Fumanchu instances or manage the cache lifecycle yourself:

```javascript
import { fumanchu, CacheableMemory } from '@jaredwray/fumanchu';
const cache = new CacheableMemory({ ttl: '1h', lruSize: 1000, useClone: false });

const hbs1 = fumanchu({ caching: cache });
const hbs2 = fumanchu({ caching: cache }); // shares the same cache as hbs1
```

## How to Contribute
Clone the repository locally refer to the [CONTRIBUTING](CONTRIBUTING.md) guide. If you have any questions please feel free to ask by creating an issue and label it `question`.

## License and Copyright
[MIT](LICENSE) and codebase after 2023 will be copyright of Jared Wray.

This is a fork of [handlebars-helpers]() which is licensed under MIT. Initial copyright of handlebars-helpers: `2013-2015, 2017, Jon Schlinkert, Brian Woodward`. Thank you so much for your effort and building this! We have also continued to list all contributors in `package.json` to ensure that they are recognized.
