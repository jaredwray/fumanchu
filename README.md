![Fumanchu](site/logo.svg "Fumanchu")


# fumanchu
Handlebars + Helpers Together

[![tests](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml/badge.svg)](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml)
[![codecov](https://codecov.io/gh/jaredwray/fumanchu/graph/badge.svg?token=gtYw78huva)](https://codecov.io/gh/jaredwray/fumanchu)
[![npm version](https://img.shields.io/npm/v/@jaredwray/fumanchu.svg)](https://npmjs.com/package/@jaredwray/fumanchu)
[![GitHub license](https://img.shields.io/github/license/jaredwray/fumanchu)](https://github.com/jaredwray/fumanchu/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/@jaredwray/fumanchu)](https://npmjs.com/package/@jaredwray/fumanchu)

[Handlebars](https://github.com/handlebars-lang/handlebars.js) + [Handlebars-helpers](https://github.com/helpers/handlebars-helpers) (helpers are now maintained in this project) combined into a single package. Easily use it as a drop in replacement when using handlebars directly. More than 180 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate, Verb, Ghost, gulp-handlebars, grunt-handlebars, consolidate, or any node.js/Handlebars project. Currently **189 helpers** in **20 categories**! 🎉

# Table of Contents
* [Using in Nodejs](#using-in-nodejs)
* [Just using Handlebar Helpers](#using-handlebars-helpers)
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
  * [logging](https://github.com/jonathas/logging-helpers)
  * [markdown](https://fumanchu.org/docs/helpers/markdown/)
  * [match](https://fumanchu.org/docs/helpers/match/)
  * [math]()(https://fumanchu.org/docs/helpers/math/)
  * [misc](https://fumanchu.org/docs/helpers/misc/)
  * [number](https://fumanchu.org/docs/helpers/number/)
  * [object](https://fumanchu.org/docs/helpers/object/)
  * [path](https://fumanchu.org/docs/helpers/path/)
  * [regex](https://fumanchu.org/docs/helpers/regex/)
  * [string](https://fumanchu.org/docs/helpers/string/)
  * [url](https://fumanchu.org/docs/helpers/url/)
  * [utils](https://fumanchu.org/docs/helpers/utils/)
* [How to Contribute](#how-to-contribute)
* [License and Copyright](#license-and-copyright)

# Usage Nodejs

```bash
npm install @jaredwray/fumanchu --save
```

```javascript
var {handlebars, helpers} = require('@jaredwray/fumanchu');
helpers({ handlebars: handlebars });
var template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
var html = template({foo: 'bar'});
console.log(html);
```

If using it with es6 you can access `handlebars` and `helpers`:

```javascript
import {handlebars, helpers} from '@jaredwray/fumanchu';
helpers({ handlebars: handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html);
```

If you want to just get an instance of handlebars via `createHandlebars` you can do the following **(it is async)**:

```javascript
import {createHandlebars} from '@jaredwray/fumanchu';
const handlebars = await createHandlebars(); //this will return a handlebars instance with all helpers
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html); // <p>Foo is bar</p>
```

It's just that easy! No need to add Handlebars to your project, it's already included.

# Using Handlebars Helpers

If you only want to use handlebar helpers you can easily do that by doing the following:

```javascript
var {helpers} = require('@jaredwray/fumanchu');
var handlebars = require('handlebars');
var helpersFunction = await helpers();
helpersFunction({ handlebars: handlebars });
var fn = handlebars.compile('{{add value 5}}');
console.log(fn); // 10
```

If using it with es6 you can access `helpers` via destructuring:

```javascript
import {helpers} from '@jaredwray/fumanchu';
import handlebars from 'handlebars';
const helpersFunction = await helpers();
helpersFunction({ handlebars: handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html); // <p>Foo is bar</p>
```

## How to Contribute
clone the repository locally and run 'npm i' in the root. Now that you've set up your workspace, you're ready to contribute changes to the `fumanchu` repository you can refer to the [CONTRIBUTING](CONTRIBUTING.md) guide. If you have any questions please feel free to ask by creating an issue and label it `question`.

To test the legacy helpers, you can run `npm run test:legacy` to run the tests. If you want to test the new helpers, you can run `npm run test`.

## License and Copyright
[MIT](LICENSE) and codebase after 2023 will be copyright of Jared Wray.

This is a fork of [handlebars-helpers]() which is licensed under MIT. Initial copyright of handlebars-helpers: `2013-2015, 2017, Jon Schlinkert, Brian Woodward`. Thank you so much for your effort and building this! We have also continued to list all contributors in `package.json` to ensure that they are recognized.
