---
title: 'Node.js Support'
description: 'How to use Fumanchu in Node.js and the full list of helpers registered in the Node build.'
order: 2
---

# Node.js Support

The default `@jaredwray/fumanchu` entry is the Node.js build. It registers every helper, including categories that depend on Node core modules such as `fs` and `path`.

## Install

```bash
npm install @jaredwray/fumanchu --save
```

## Use Handlebars with all helpers

`fumanchu()` returns a Handlebars instance with the full Node helper set already registered. Handlebars itself is included — you do not need to add it as a separate dependency.

```javascript
import { fumanchu } from '@jaredwray/fumanchu';

const handlebars = fumanchu();
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({ foo: 'bar' });
console.log(html); // <p>Foo is bar</p>
```

## Register helpers on an existing Handlebars instance

If you already have a Handlebars instance, call `helpers()` to attach the Node registry to it:

```javascript
import { helpers } from '@jaredwray/fumanchu';
import handlebars from 'handlebars';

helpers({ handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
console.log(template({ foo: 'bar' }));
```

You can also import Handlebars from Fumanchu:

```javascript
import { handlebars, helpers } from '@jaredwray/fumanchu';

helpers({ handlebars });
const template = handlebars.compile('{{uppercase name}}');
console.log(template({ name: 'hello' })); // HELLO
```

## Helper registry

`HelperRegistry` loads the full Node helper set. Use it to register extra helpers or to load a filtered subset:

```javascript
import { HelperRegistry, handlebars } from '@jaredwray/fumanchu';

const registry = new HelperRegistry();
registry.register('eq', (a, b) => a === b);
registry.load(handlebars, { names: ['eq'] });
```

Helpers also declare a compatibility flag such as `HelperRegistryCompatibility.NODEJS` or `HelperRegistryCompatibility.BROWSER`, so you can filter by environment.

## Caching

When caching is enabled, Fumanchu wraps Handlebars `compile()` and stores compiled template functions in [@cacheable/memory](https://github.com/jaredwray/cacheable/tree/main/packages/memory). Compiling the same template string again returns the cached function.

The `caching` option accepts a boolean, a `CacheableMemory` instance, or a `CacheableMemoryOptions` object (`ttl`, `lruSize`, `checkInterval`, and so on).

```javascript
import { fumanchu } from '@jaredwray/fumanchu';

const handlebars = fumanchu({ caching: true });
const template = handlebars.compile('Hello {{name}}!');
template({ name: 'World' }); // compiles and caches
handlebars.compile('Hello {{name}}!'); // cached — no recompilation
```

```javascript
import { fumanchu } from '@jaredwray/fumanchu';

const handlebars = fumanchu({
  caching: {
    ttl: '1h',
    lruSize: 500,
    checkInterval: 0,
  },
});
```

```javascript
import { fumanchu, CacheableMemory } from '@jaredwray/fumanchu';

const cache = new CacheableMemory({ ttl: '1h', lruSize: 1000, useClone: false });
const hbs1 = fumanchu({ caching: cache });
const hbs2 = fumanchu({ caching: cache }); // shares the same cache as hbs1
```

## Available helpers

The Node build registers every helper below. Helpers marked **(Node only)** are omitted from the [browser build](/docs/browser/). See the category pages for parameters and examples.

### [Array](/docs/helpers/array/)

`after`, `before`, `arrayify`, `first`, `last`, `length`, `join`, `forEach`, `inArray`, `isArray`, `itemAt`, `equalsLength`, `some`, `eachIndex`, `withAfter`, `withBefore`, `withFirst`, `withLast`, `withGroup`, `withSort`, `filter`, `map`, `pluck`, `reverse`, `sort`, `sortBy`, `unique`

### [Code](/docs/helpers/code/)

`gist`, `jsfiddle`, `embed` **(Node only)**

### [Collection](/docs/helpers/collection/)

`isEmpty`, `iterate`

### [Comparison](/docs/helpers/comparison/)

`and`, `compare`, `contains`, `default`, `eq`, `gt`, `gte`, `has`, `isFalsey`, `isTruthy`, `ifEven`, `ifNth`, `ifOdd`, `is`, `isnt`, `lt`, `lte`, `neither`, `not`, `or`, `unlessEq`, `unlessGt`, `unlessLt`, `unlessGteq`, `unlessLteq`

### [Date](/docs/helpers/date/)

`year`, `date`, `moment`, `timestamp`, `now`, `fromNow`, `toNow`, `ago`, `dateAdd`, `dateSubtract`, `startOf`, `endOf`, `isBefore`, `isAfter`, `isSame`, `isBetween`, `diff`, `toISOString`, `dateTimezone`, `dateLocale`

### [File System](/docs/helpers/fs/) **(Node only)**

`fileSize`, `read`, `readdir`

### [Html](/docs/helpers/html/)

`attr`, `sanitize`, `ul`, `ol`, `thumbnailImage`, `css` **(Node only)**, `js` **(Node only)**

### [i18n](/docs/helpers/i18n/)

`i18n`

### [Inflection](/docs/helpers/inflection/)

`inflect`, `ordinalize`

### [Logging](/docs/helpers/logging/) **(Node only)**

`log`, `ok`, `success`, `info`, `warning`, `warn`, `error`, `danger`, `bold`, `_debug`, `_inspect`

### [Markdown](/docs/helpers/markdown/)

`md`, `markdown`

On Node these helpers also accept a file path and read its contents before rendering. The browser build renders inline markdown only.

### [Match](/docs/helpers/match/)

`match`, `isMatch`, `mm`

### [Math](/docs/helpers/math/)

`abs`, `add`, `avg`, `ceil`, `divide`, `floor`, `minus`, `modulo`, `multiply`, `plus`, `random`, `remainder`, `round`, `subtract`, `sum`, `times`

### [Misc](/docs/helpers/misc/)

`frame`, `option`, `noop`, `typeOf`, `withHash`

### [Number](/docs/helpers/number/)

`bytes`, `addCommas`, `phoneNumber`, `toAbbr`, `toExponential`, `toFixed`, `toFloat`, `toInt`, `toPrecision`

### [Object](/docs/helpers/object/)

`extend`, `forIn`, `forOwn`, `toPath`, `get`, `getObject`, `hasOwn`, `isObject`, `JSONparse`, `JSONstringify`, `merge`, `parseJSON`, `pick`, `stringify`

### [Path](/docs/helpers/path/) **(Node only)**

`absolute`, `dirname`, `relative`, `basename`, `stem`, `extname`, `resolve`, `segments`

### [Regex](/docs/helpers/regex/)

`toRegex`, `test`

### [String](/docs/helpers/string/)

`append`, `camelcase`, `capitalize`, `capitalizeAll`, `center`, `chop`, `dashcase`, `dotcase`, `ellipsis`, `hyphenate`, `isString`, `lowercase`, `downcase`, `occurrences`, `pascalcase`, `pathcase`, `plusify`, `prepend`, `remove`, `removeFirst`, `replace`, `replaceFirst`, `reverse`, `sentence`, `snakecase`, `trim`, `trimLeft`, `trimRight`, `truncate`, `truncateWords`, `uppercase`, `upcase`, `split`, `startsWith`, `titleize`, `raw`

### [Url](/docs/helpers/url/)

`encodeURI`, `decodeURI`, `url_encode`, `url_decode`, `stripQuerystring`, `escape` **(Node only)**, `urlResolve` **(Node only)**, `urlParse` **(Node only)**, `stripProtocol` **(Node only)**
