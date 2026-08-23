---
title: 'Browser Support'
description: 'How to use Fumanchu in the browser and the list of helpers registered in the browser-safe build.'
order: 3
---

# Browser Support

Fumanchu ships a browser-safe build that excludes helpers that depend on Node core modules. The public API (`fumanchu`, `helpers`, `HelperRegistry`) is the same as [Node.js](/docs/nodejs/); only the registered helper set differs.

## Import the browser build

Use the `/browser` subpath when you want the browser registry explicitly:

```javascript
import { fumanchu } from '@jaredwray/fumanchu/browser';

const handlebars = fumanchu();
const template = handlebars.compile('{{uppercase name}}');
console.log(template({ name: 'hello' })); // HELLO
```

The package also sets the `browser` export condition on the main entry. Webpack, Vite, esbuild, Rollup, and other browser-aware bundlers pick up the browser build automatically when you `import '@jaredwray/fumanchu'` from a browser target — no code change required.

## Register helpers on an existing Handlebars instance

```javascript
import { helpers } from '@jaredwray/fumanchu/browser';
import Handlebars from 'handlebars';

helpers({ handlebars: Handlebars });
const template = Handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
console.log(template({ foo: 'bar' }));
```

## Load from a CDN

You can load the browser build from a CDN such as [jsDelivr](https://www.jsdelivr.com/package/npm/@jaredwray/fumanchu) with no bundler:

```html
<script type="module">
  import { fumanchu } from 'https://cdn.jsdelivr.net/npm/@jaredwray/fumanchu/dist/index.browser.mjs';
  const handlebars = fumanchu();
  document.body.textContent = handlebars.compile('{{uppercase name}}')({ name: 'hello' });
</script>
```

## Helper registry

`HelperRegistry` in the browser entry is the browser-safe registry. It registers every environment-neutral helper and omits anything that depends on Node core modules.

```javascript
import { HelperRegistry, handlebars } from '@jaredwray/fumanchu/browser';

const registry = new HelperRegistry();
registry.load(handlebars);
```

## Caching

Template compile caching works the same way as on Node. Pass `caching: true`, a `CacheableMemory` instance, or cache options:

```javascript
import { fumanchu } from '@jaredwray/fumanchu/browser';

const handlebars = fumanchu({ caching: true });
const template = handlebars.compile('{{uppercase name}}');
console.log(template({ name: 'hello' })); // HELLO
```

## Not available in the browser

These helpers need Node APIs (`fs`, `path`, the terminal, and related modules) and are not registered in the browser build:

- The entire [fs](/docs/helpers/fs/), [path](/docs/helpers/path/), and [logging](/docs/helpers/logging/) categories
- `embed` from [code](/docs/helpers/code/)
- `css` and `js` from [html](/docs/helpers/html/)
- `escape`, `urlResolve`, `urlParse`, and `stripProtocol` from [url](/docs/helpers/url/)

[Markdown](/docs/helpers/markdown/) helpers (`md`, `markdown`) **are** registered. They render inline markdown only — unlike Node, they will not read a file path from disk.

See [Node.js Support](/docs/nodejs/) for the full helper set, including Node-only helpers.

## Available helpers

See the category pages for parameters and examples.

### [Array](/docs/helpers/array/)

`after`, `before`, `arrayify`, `first`, `last`, `length`, `join`, `forEach`, `inArray`, `isArray`, `itemAt`, `equalsLength`, `some`, `eachIndex`, `withAfter`, `withBefore`, `withFirst`, `withLast`, `withGroup`, `withSort`, `filter`, `map`, `pluck`, `reverse`, `sort`, `sortBy`, `unique`

### [Code](/docs/helpers/code/)

`gist`, `jsfiddle`

### [Collection](/docs/helpers/collection/)

`isEmpty`, `iterate`

### [Comparison](/docs/helpers/comparison/)

`and`, `compare`, `contains`, `default`, `eq`, `gt`, `gte`, `has`, `isFalsey`, `isTruthy`, `ifEven`, `ifNth`, `ifOdd`, `is`, `isnt`, `lt`, `lte`, `neither`, `not`, `or`, `unlessEq`, `unlessGt`, `unlessLt`, `unlessGteq`, `unlessLteq`

### [Date](/docs/helpers/date/)

`year`, `date`, `moment`, `timestamp`, `now`, `fromNow`, `toNow`, `ago`, `dateAdd`, `dateSubtract`, `startOf`, `endOf`, `isBefore`, `isAfter`, `isSame`, `isBetween`, `diff`, `toISOString`, `dateTimezone`, `dateLocale`

### [Html](/docs/helpers/html/)

`attr`, `sanitize`, `ul`, `ol`, `thumbnailImage`

### [i18n](/docs/helpers/i18n/)

`i18n`

### [Inflection](/docs/helpers/inflection/)

`inflect`, `ordinalize`

### [Markdown](/docs/helpers/markdown/)

`md`, `markdown`

Inline markdown only. A file path is treated as a string, not read from disk.

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

### [Regex](/docs/helpers/regex/)

`toRegex`, `test`

### [String](/docs/helpers/string/)

`append`, `camelcase`, `capitalize`, `capitalizeAll`, `center`, `chop`, `dashcase`, `dotcase`, `ellipsis`, `hyphenate`, `isString`, `lowercase`, `downcase`, `occurrences`, `pascalcase`, `pathcase`, `plusify`, `prepend`, `remove`, `removeFirst`, `replace`, `replaceFirst`, `reverse`, `sentence`, `snakecase`, `trim`, `trimLeft`, `trimRight`, `truncate`, `truncateWords`, `uppercase`, `upcase`, `split`, `startsWith`, `titleize`, `raw`

### [Url](/docs/helpers/url/)

`encodeURI`, `decodeURI`, `url_encode`, `url_decode`, `stripQuerystring`
