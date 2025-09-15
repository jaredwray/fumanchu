![Fumanchu](site/logo.svg "Fumanchu")


# fumanchu
Handlebars + Helpers Together

[![tests](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml/badge.svg)](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml)
[![codecov](https://codecov.io/gh/jaredwray/fumanchu/graph/badge.svg?token=gtYw78huva)](https://codecov.io/gh/jaredwray/fumanchu)
[![npm version](https://img.shields.io/npm/v/@jaredwray/fumanchu.svg)](https://npmjs.com/package/@jaredwray/fumanchu)
[![GitHub license](https://img.shields.io/github/license/jaredwray/fumanchu)](https://github.com/jaredwray/fumanchu/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/@jaredwray/fumanchu)](https://npmjs.com/package/@jaredwray/fumanchu)

[Handlebars](https://github.com/handlebars-lang/handlebars.js) + [Handlebars-helpers](https://github.com/helpers/handlebars-helpers) (helpers are now maintained in this project) combined into a single package. Easily use it as a drop in replacement when using handlebars directly. More than 160 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate, Verb, Ghost, gulp-handlebars, grunt-handlebars, consolidate, or any node.js/Handlebars project. Currently **189 helpers** in **20 categories**! 🎉

# Table of Contents
* [Using in Nodejs](#using-in-nodejs)
* [Just using Handlebar Helpers](#using-handlebars-helpers)
* [Migrating from v3 to v4](#migrating-from-v3-to-v4)
* [Helpers](https://fumanchu.org/docs/)
  * [array](https://fumanchu.org/docs/array/)
  * [code](https://fumanchu.org/docs/code/)
  * [comparison](https://fumanchu.org/docs/comparison/)
  * [collection](https://fumanchu.org/docs/collection/)
  * [date](https://fumanchu.org/docs/date/)
  * [fs](https://fumanchu.org/docs/fs/)
  * [html](https://fumanchu.org/docs/html/)
  * [i18n](https://fumanchu.org/docs/i18n/)
  * [inflection](https://fumanchu.org/docs/inflection/)
  * [logging](https://github.com/jonathas/logging-helpers)
  * [markdown](https://fumanchu.org/docs/markdown/)
  * [match](https://fumanchu.org/docs/match/)
  * [math](https://fumanchu.org/docs/math/)
  * [misc](https://fumanchu.org/docs/misc/)
  * [number](https://fumanchu.org/docs/number/)
  * [object](https://fumanchu.org/docs/object/)
  * [path](https://fumanchu.org/docs/path/)
  * [regex](https://fumanchu.org/docs/regex/)
  * [string](https://fumanchu.org/docs/string/)
  * [url](https://fumanchu.org/docs/url/)
  * [utils](https://fumanchu.org/docs/utils/)
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

# Migrating from v3 to v4

We have made some breaking changes in v4:
* We no longer support the legacy helpers that were in this project as we have migrated to a new helper system.
* `createHandlebars` is now deprecated in favor of just using `fumanchu()` and no more needing async.
* The `FumanchuOptions` has been changed on filtering and also now fully supported with `fumanchu()`

## How to Contribute
Clone the repository locally refer to the [CONTRIBUTING](CONTRIBUTING.md) guide. If you have any questions please feel free to ask by creating an issue and label it `question`.

## License and Copyright
[MIT](LICENSE) and codebase after 2023 will be copyright of Jared Wray.

This is a fork of [handlebars-helpers]() which is licensed under MIT. Initial copyright of handlebars-helpers: `2013-2015, 2017, Jon Schlinkert, Brian Woodward`. Thank you so much for your effort and building this! We have also continued to list all contributors in `package.json` to ensure that they are recognized.
